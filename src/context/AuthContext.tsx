import React, { createContext } from 'react';
import { useCallback } from 'react';

import { api } from '../services/api';

interface ISignInCreadentials {
  email: string;
  password: string;
}

interface AuthContextState {
  name: string;
  signIn(data: ISignInCreadentials): Promise<void>;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(
    async ({ email, password }: ISignInCreadentials) => {
      const response = await api.post('sessions', { email, password });

      console.log(response);
    },
    [],
  );

  return (
    /* @ts-ignore */
    <AuthContext.Provider value={{ name: 'Eliel', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
