const { Given, When, Then } = require('@cucumber/cucumber') // Ensure this is imported correctly

let sendMessage, getMessages, expect

(async () => {
  const { sendMessage: send, getMessages: get } = await import('../../src/Service/FirebaseChatervice.js');
  const { expect: ex } = await import('chai');
  sendMessage = send;
  getMessages = get;
  expect = ex;
})();

Given('I am logged in as {string}', async (email) => {
  // For simplicity, we assume the user is already authenticated
  // Add authentication here if needed
  console.log(`Logged in as: ${email}`);
});

Given('I am chatting with {string}', (friendEmail) => {
  // Ensure the chat context is set up
  console.log(`Chatting with: ${friendEmail}`);
});

When('I send the message {string}', async (message) => {
  sentMessage = message;
  try {
    await sendMessage(message, 'currentUser@example.com', 'friend@example.com'); // Replace with dynamic emails
  } catch (error) {
    console.error("Error in sending message:", error.message);
    throw error;
  }
});

Then('the message {string} should appear in the chat', async (expectedMessage) => {
  try {
    await new Promise((resolve) => {
      getMessages('currentUser@example.com', 'friend@example.com', (messages) => {
        fetchedMessages = messages;
        resolve();
      });
    });

    const messageTexts = fetchedMessages.map((msg) => msg.text);
    expect(messageTexts).to.include(expectedMessage);
  } catch (error) {
    console.error("Error in fetching messages:", error.message);
    throw error;
  }
});
