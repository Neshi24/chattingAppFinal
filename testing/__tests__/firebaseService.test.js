import {
  sendFriendRequest,
  acceptFriendRequest,
  denyFriendRequest,
  getFriends,
  getMessages,
  sendMessage,
  addFriend,
} from '../../src/Service/FirebaseChatervice';
import {
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  collection,
  doc,
  arrayUnion,
  setDoc
} from 'firebase/firestore';
import { decryptMessage } from '../../src/Service/ChatEncryption';

jest.mock('firebase/firestore');
jest.mock('../../src/Service/ChatEncryption', () => ({
  decryptMessage: jest.fn((text) => text),
}));

describe('Friend Request and Messaging Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send a friend request', async () => {
    const mockCollectionRef = collection(null, 'friendRequests');
    await sendFriendRequest('sender@example.com', 'receiver@example.com');
    
    expect(addDoc).toHaveBeenCalledWith(mockCollectionRef, {
      senderEmail: 'sender@example.com',
      receiverEmail: 'receiver@example.com',
      status: 'pending',
    });
  });

  it('should deny a friend request', async () => {
    const mockDocRef = doc(null, 'friendRequests', 'invitationId');
    await denyFriendRequest('invitationId');
    
    expect(updateDoc).toHaveBeenCalledWith(mockDocRef, {
      status: 'denied',
    });
  });

  it('should get a user\'s friends list', async () => {
    const callback = jest.fn();
    const mockFriends = ['existingFriend@example.com'];

    onSnapshot.mockImplementation((docRef, cb) => {
      cb({
        exists: () => true,
        data: () => ({ friends: mockFriends })
      });
      return () => {};
    });

    getFriends('user@example.com', callback);

    expect(callback).toHaveBeenCalledWith(mockFriends);
  });

  it('should send a message', async () => {
    const mockCollectionRef = collection(null, 'messages');
    const mockDate = new Date('2025-01-04T19:20:03.171Z');
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    
    await sendMessage('Hello!', 'user@example.com', 'friend@example.com');
    
    expect(addDoc).toHaveBeenCalledWith(mockCollectionRef, {
      text: 'Hello!',
      senderEmail: 'user@example.com',
      receiverEmail: 'friend@example.com',
      timestamp: mockDate,
    });
  });

  it('should add a friend', async () => {
    getDocs.mockImplementationOnce(() => ({
      empty: true,
      docs: []
    }));

    const mockCollectionRef = collection(null, 'friends');
    collection.mockReturnValue(mockCollectionRef);
    
    await addFriend('user@example.com', 'newfriend@example.com');
    
    expect(query).toHaveBeenCalledWith(
      mockCollectionRef,
      where('userEmail', '==', 'user@example.com')
    );
    
    expect(addDoc).toHaveBeenCalledWith(mockCollectionRef, {
      userEmail: 'user@example.com',
      friends: ['newfriend@example.com']
    });
  });

  it('should update existing friend list', async () => {
    getDocs.mockImplementationOnce(() => ({
      empty: false,
      docs: [{
        id: 'existingDocId',
        data: () => ({
          userEmail: 'user@example.com',
          friends: ['existing@example.com']
        })
      }]
    }));

    const mockCollectionRef = collection(null, 'friends');
    collection.mockReturnValue(mockCollectionRef);
    
    await addFriend('user@example.com', 'newfriend@example.com');
    
    expect(updateDoc).toHaveBeenCalledWith(
      doc(null, 'friends', 'existingDocId'),
      {
        friends: arrayUnion('newfriend@example.com')
      }
    );
  });

  it('should handle friend request to non-existent user', async () => {
    const mockCollectionRef = collection(null, 'friendRequests');
    await sendFriendRequest('sender@example.com', '');
    
    expect(addDoc).toHaveBeenCalledWith(mockCollectionRef, {
      senderEmail: 'sender@example.com',
      receiverEmail: '',
      status: 'pending',
    });
  });

  it('should handle getting friends list for new user with no friends', async () => {
    const callback = jest.fn();
    
    onSnapshot.mockImplementation((docRef, cb) => {
      cb({
        exists: () => true,
        data: () => ({ friends: [] })
      });
      return () => {};
    });

    getFriends('newuser@example.com', callback);
    expect(callback).toHaveBeenCalledWith([]);
  });

  it('should handle non-existent friend document when getting friends', async () => {
    const callback = jest.fn();
    
    onSnapshot.mockImplementation((docRef, cb) => {
      cb({
        exists: () => false,
        data: () => null
      });
      return () => {};
    });

    getFriends('user@example.com', callback);
    expect(callback).toHaveBeenCalledWith([]);
  });

  it('should handle duplicate friend additions', async () => {
    getDocs.mockImplementationOnce(() => ({
      empty: false,
      docs: [{
        id: 'existingDocId',
        data: () => ({
          userEmail: 'user@example.com',
          friends: ['friend@example.com']
        })
      }]
    }));

    const mockCollectionRef = collection(null, 'friends');
    collection.mockReturnValue(mockCollectionRef);
    
    await addFriend('user@example.com', 'friend@example.com');
    
    expect(updateDoc).toHaveBeenCalledWith(
      doc(null, 'friends', 'existingDocId'),
      {
        friends: arrayUnion('friend@example.com')
      }
    );
  });

  it('should handle denying non-existent friend request', async () => {
    const mockDocRef = doc(null, 'friendRequests', 'nonexistentId');
    await denyFriendRequest('nonexistentId');
    
    expect(updateDoc).toHaveBeenCalledWith(mockDocRef, {
      status: 'denied',
    });
  });

  it('should handle special characters in messages', async () => {
    const mockCollectionRef = collection(null, 'messages');
    const mockDate = new Date('2025-01-04T19:20:03.171Z');
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    
    const messageWithSpecialChars = '!@#$%^&*()_+<>?:"{}|';
    await sendMessage(messageWithSpecialChars, 'user@example.com', 'friend@example.com');
    
    expect(addDoc).toHaveBeenCalledWith(mockCollectionRef, {
      text: messageWithSpecialChars,
      senderEmail: 'user@example.com',
      receiverEmail: 'friend@example.com',
      timestamp: mockDate,
    });
  });
});