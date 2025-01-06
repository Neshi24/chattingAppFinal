Feature: Messaging functionality
  As a user
  I want to send and receive messages
  So that I can communicate with my friends

  Scenario: Successfully sending a message
    Given I am logged in as "user1@example.com"
    And I am on the chat page with "user2@example.com"
    When I send the message "Hello, User2!"
    Then the message "Hello, User2!" should appear in the chat

  Scenario: Receiving a message
    Given I am logged in as "user2@example.com"
    And I am on the chat page with "user1@example.com"
    When "user1@example.com" sends the message "Hi, User2!"
    Then the message "Hi, User2!" should appear in the chat
