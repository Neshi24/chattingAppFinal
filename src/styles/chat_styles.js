import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  verificationAlert: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    right: '10%',
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  alertText: {
    fontSize: 16,
    color: '#721c24',
    marginBottom: 10,
    textAlign: 'center',
  },
  resendButton: {
    backgroundColor: '#d4edda',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  resendButtonText: {
    color: '#155724',
  },
  closeAlertButton: {
    marginTop: 10,
    padding: 10,
  },
  closeAlertButtonText: {
    color: '#721c24',
  },

  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#6200ea',
  },
  loggedInText: {
    fontSize: 16,
    color: '#fff',
  },
  signOutButton: {
    backgroundColor: '#ff5252',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  signOutButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  body: {
    flexDirection: 'row',
    flex: 1,
    padding: 10,
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  chattingWithText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  noRecipientText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#999',
    marginBottom: 10,
  },
  chatContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  messageList: {
    flex: 1,
  },
  scrollViewContainer: {
    paddingBottom: 10,
  },
  messageItem: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
  },
  myMessageItem: {
    backgroundColor: '#e1bee7',
    alignSelf: 'flex-end',
  },
  messageSender: {
    fontWeight: 'bold',
    color: '#6200ea',
  },
  messageText: {
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  sendButton: {
    backgroundColor: '#6200ea',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  friendList: {
    flex: 1,
    marginBottom: 10,
  },
  friendItem: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    marginVertical: 5,
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#6200ea',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Invitations Column
  invitationList: {
    flex: 1,
    marginBottom: 10,
  },
  invitationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginVertical: 5,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  acceptButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginRight: 5,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  denyButton: {
    backgroundColor: '#f44336',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  denyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default styles;
