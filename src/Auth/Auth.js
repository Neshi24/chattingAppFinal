import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut,sendPasswordResetEmail  } from 'firebase/auth';
import AuthFactory from '../Factory/AuthFactory';
import { auth } from '../../firebaseconfig';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('Auth state changed. Current user:', currentUser);
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const authHandlers = {
    google: AuthFactory.createAuth('google'),
    email: AuthFactory.createAuth('email'),
  };

  const signIn = async (type, ...args) => {
    try {
      const authHandler = authHandlers[type];
      const user = await authHandler.signIn(...args);
      setUser(user);
    } catch (error) {
      console.error(error.message);
    }
  };

  const signUp = async (email, password) => {
    try {
      const user = await authHandlers.email.signUp(email, password);
      setUser(user);
    } catch (error) {
      console.error(error.message);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Error resetting password:', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut,resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
