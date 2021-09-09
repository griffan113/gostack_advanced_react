import React, { createContext } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { api } from '../services/api';

interface User {
  id: string;
  name: string;
  avatar: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}
interface ISignInCreadentials {
  email: string;
  password: string;
}

interface AuthContextState {
  user: User;
  signIn(data: ISignInCreadentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ email, password }: ISignInCreadentials) => {
      const response = await api.post('sessions', { email, password });

      const { token, user } = response.data;

      localStorage.setItem('@GoBarber:token', token);
      localStorage.setItem('@GoBarber:user', JSON.stringify(user));

      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ token, user });
    },
    [],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    window.location.reload();
  }, []);

  return (
    /* @ts-ignore */
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextState {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
}

export { AuthProvider, useAuth };
