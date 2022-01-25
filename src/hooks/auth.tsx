import React, { createContext, useContext, ReactNode, useState } from "react";
import api from "../services/api";
// usar context, amarzenar dado em um único local

interface User {
  id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
}

// aquilo que vou armazenar no meu estado
interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

// aquilo que vou querer compartilhar
interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  // criar um estado para amarzenar os estados de autentificação

  const [data, setData] = useState<AuthState>({} as AuthState);

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post("/sessions", {
      email,
      password,
    });

    const { token, user } = response.data;
    //
    if (api.defaults?.headers && api.defaults.headers.common) {
      api.defaults.headers.common["x-auth-token"] = token;
    }
    // api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// esse vai ser o hook em si

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
