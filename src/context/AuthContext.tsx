import React, { createContext } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';

import { api } from '../services/api';

interface AuthState {
  token: string;
  user: object;
}
interface ISignInCreadentials {
  email: string;
  password: string;
}

interface AuthContextState {
  user: object;
  signIn(data: ISignInCreadentials): Promise<void>;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
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

      setData({ token, user });
    },
    [],
  );

  return (
    /* @ts-ignore */
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
