import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { getFriends, getMessages, sendMessage, sendFriendRequest, listenToFriendRequests, acceptFriendRequest, denyFriendRequest } from '../Service/FirebaseChatervice';
import { encryptMessage } from '../Service/ChatEncryption';
import styles from '../styles/chat_styles';
import { sendEmailVerification } from 'firebase/auth';

export default function Chat({ user, signOut }) {
  const [message, setMessage] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [messages, setMessages] = useState([]);
  const [friends, setFriends] = useState([]);
  const [newFriendEmail, setNewFriendEmail] = useState('');
  const [invitations, setInvitations] = useState([]);
  const [showVerificationAlert, setShowVerificationAlert] = useState(!user.emailVerified);

  const flatListRef = useRef();

  useEffect(() => {
    if (user) {
      const unsubscribe = getFriends(user.email, setFriends);
      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    if (user && receiverEmail) {
      const unsubscribe = getMessages(user.email, receiverEmail, setMessages);
      return () => unsubscribe();
    }
  }, [user, receiverEmail]);

  useEffect(() => {
    if (user) {
      const unsubscribe = listenToFriendRequests(user.email, setInvitations);
      return () => unsubscribe();
    }
  }, [user]);

  const handleSendMessage = async () => {
    try {
      const encryptedMessage = await encryptMessage(message);
      console.log('Encrypted message:', encryptedMessage);
      await sendMessage(encryptedMessage, user.email, receiverEmail);

      setMessage('');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAddFriend = async () => {
    try {
      // Send a friend request instead of directly adding the friend
      await sendFriendRequest(user.email, newFriendEmail); // Send friend request to the entered email
      setNewFriendEmail('');
      alert('Friend request sent!');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAcceptRequest = async (invitationId, senderEmail) => {
    try {
      await acceptFriendRequest(senderEmail, user.email, invitationId);
      alert('Friend request accepted!');
    } catch (error) {
      alert(error.message);
    }
  };
  

  const handleDenyRequest = async (invitationId) => {
    try {
      await denyFriendRequest(invitationId);
      alert('Friend request denied!');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Verification Alert */}
      {showVerificationAlert && (
        <View style={styles.verificationAlert}>
          <Text style={styles.alertText}>
            Your email is not verified. Please verify to continue.
          </Text>
          <TouchableOpacity style={styles.resendButton} onPress={handleResendVerificationEmail}>
            <Text style={styles.resendButtonText}>Resend Verification Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeAlertButton} onPress={() => setShowVerificationAlert(false)}>
            <Text style={styles.closeAlertButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.loggedInText}>Logged in as: {user.email}</Text>
        <TouchableOpacity onPress={signOut} style={styles.signOutButton}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* Main Body with Three Columns */}
      <View style={styles.body}>
        {/* Chat Column */}
        <View style={styles.column}>
          <Text style={styles.subheading}>Chat</Text>
          {receiverEmail ? (
            <Text style={styles.chattingWithText}>Chatting with: {receiverEmail}</Text>
          ) : (
            <Text style={styles.noRecipientText}>Select a friend to start chatting</Text>
          )}
          <KeyboardAvoidingView
            style={styles.chatContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.messageItem,
                    item.senderEmail === user.email && styles.myMessageItem,
                  ]}
                >
                  <Text style={styles.messageSender}>{item.senderEmail}</Text>
                  <Text style={styles.messageText}>{item.text}</Text>
                </View>
              )}
              style={styles.messageList}
              contentContainerStyle={styles.scrollViewContainer}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() => {
                if (flatListRef.current) {
                  flatListRef.current.scrollToEnd({ animated: true });
                }
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Type your message"
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>

        {/* Friends Column */}
        <View style={styles.column}>
          <Text style={styles.subheading}>Friends</Text>
          <FlatList
            data={friends}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.friendItem} onPress={() => setReceiverEmail(item)}>
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
            style={styles.friendList}
          />
          <TextInput
            style={styles.input}
            placeholder="Add a friend by email"
            value={newFriendEmail}
            onChangeText={setNewFriendEmail}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddFriend}>
            <Text style={styles.addButtonText}>Send Invitation</Text>
          </TouchableOpacity>
        </View>

        {/* Invitations Column */}
        <View style={styles.column}>
          <Text style={styles.subheading}>Invitations</Text>
          <FlatList
            data={invitations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.invitationItem}>
                <Text>{item.senderEmail}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={() => handleAcceptRequest(item.id, item.senderEmail)}
                  >
                    <Text style={styles.acceptButtonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.denyButton}
                    onPress={() => handleDenyRequest(item.id)}
                  >
                    <Text style={styles.denyButtonText}>Deny</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            style={styles.invitationList}
          />
        </View>
      </View>
    </View>
  );
}
