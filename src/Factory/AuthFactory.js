import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification  } from 'firebase/auth';
import { auth, provider as googleProvider } from '../../firebaseconfig';

class GoogleAuth {
  async signIn() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      throw new Error(`Google Sign-In failed: ${error.message}`);
    }
  }
}

class EmailAuth {
  async signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(`Email Sign-In failed: ${error.message}`);
    }
  }

  async signUp(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // verify email of user on sign up
      await sendEmailVerification(user);
      return userCredential.user;
    } catch (error) {
      throw new Error(`Email Sign-Up failed: ${error.message}`);
    }
  }
}

class AuthFactory {
  static createAuth(type) {
    switch (type) {
      case 'google':
        return new GoogleAuth();
      case 'email':
        return new EmailAuth();
      default:
        throw new Error('Unsupported authentication');
    }
  }
}

export default AuthFactory;
