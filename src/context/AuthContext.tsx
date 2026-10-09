import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  authError: string | null;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  loginWithEmail: async () => {},
  logout: async () => {},
  authError: null,
  clearAuthError: () => {},
});

export const ADMIN_EMAIL = 'mostudioapps@gmail.com';
export const ADMIN_PASS = 'Nasef@35365507';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginWithEmail = async (email: string, pass: string) => {
    setAuthError(null);
    const normalizedEmail = email.trim().toLowerCase();

    // Enforce strict single admin account restriction
    if (normalizedEmail !== ADMIN_EMAIL) {
      const err = new Error('Access denied. Only the authorized administrator account can access this panel.');
      setAuthError(err.message);
      throw err;
    }

    if (pass !== ADMIN_PASS) {
      const err = new Error('Incorrect password. Please verify the administrator password.');
      setAuthError(err.message);
      throw err;
    }

    try {
      await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASS);
    } catch (err: unknown) {
      const firebaseErr = err as { code?: string; message?: string };
      // If the admin user hasn't been created yet in this Firebase project, bootstrap it once
      if (
        firebaseErr?.code === 'auth/user-not-found' ||
        firebaseErr?.code === 'auth/invalid-credential' ||
        firebaseErr?.code === 'auth/invalid-login-credentials'
      ) {
        try {
          await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASS);
          return;
        } catch {
          // If creation fails (e.g. email already exists with different credentials), throw original
          const msg = firebaseErr.message || 'Login failed';
          setAuthError(msg);
          throw err;
        }
      }
      const msg = firebaseErr.message || 'Login failed';
      setAuthError(msg);
      throw err;
    }
  };

  const logout = async () => {
    setAuthError(null);
    try {
      await signOut(auth);
    } catch (err: unknown) {
      console.error('Logout error:', err);
    }
  };

  const clearAuthError = () => setAuthError(null);

  // Strictly enforce that only mostudioapps@gmail.com is recognized as the admin
  const isAdmin = Boolean(user && user.email === ADMIN_EMAIL);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        loginWithEmail,
        logout,
        authError,
        clearAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
