import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles/login_style';
import { useAuth } from '../Auth/Auth';

export default function Login({ signIn, navigation }) {
  const { resetPassword } = useAuth(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailSignIn = () => {
    signIn('email', email, password);
  };

  const handleGoogleSignIn = () => {
    signIn('google');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleResetPassword = () => {
    if (email) {
      resetPassword(email);
    } else {
      alert('Please enter your email to reset your password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        autoCapitalize="none"
        onChangeText={setPassword}
        value={password}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleEmailSignIn}>
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Log in with</Text>
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
        <Text style={styles.googleButtonText}>G</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetPasswordButton} onPress={handleResetPassword}>
        <Text style={styles.resetPasswordButtonText}>Forgot Password?</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        No account?{' '}
        <Text style={styles.signUpText} onPress={handleSignUp}>
          Sign up
        </Text>
      </Text>
    </View>
  );
}
