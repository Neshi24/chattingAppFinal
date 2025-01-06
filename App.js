import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './src/Auth/Auth.js';
import Login from './src/screens/Login.js';
import Chat from './src/screens/Chat.js';
import SignUp from './src/screens/Signup.js';

const Stack = createStackNavigator();

function MainNavigator() {
  const { user, signOut, signUp, signInEmailPassword,signIn } = useAuth();
//test
  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen name="Chat">
          {() => <Chat user={user} signOut={signOut} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="Login">
          {({ navigation }) => (
            <Login
              signUp={signUp}
              signInEmailPassword={signInEmailPassword}
              navigation={navigation} 
              signIn={signIn} 
            />
          )}
        </Stack.Screen>
      )}
      <Stack.Screen name="SignUp">
        {({ navigation }) => <SignUp navigation={navigation} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
