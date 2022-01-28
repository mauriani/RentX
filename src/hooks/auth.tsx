import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import api from "../services/api";
import { database } from "../database";
import { User as ModelUser } from "../database/model/User";
// usar context, amarzenar dado em um único local

interface User {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
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

  const [data, setData] = useState<User>({} as User);

  async function signIn({ email, password }: SignInCredentials) {
    console.log("entrei ?");
    try {
      const response = await api.post("/sessions", {
        email,
        password,
      });

      const { token, user } = response.data;

      // inclui o token no "cabecario" do user
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Inserindo meu usupario no banco local;
      const userCollection = database.get<ModelUser>("users");
      await database.write(async () => {
        await userCollection.create((newUser) => {
          newUser.user_id = user.id;
          newUser.name = user.name;
          newUser.email = user.email;
          newUser.driver_license = user.driver_license;
          newUser.avatar = user.avatar;
          newUser.token = token;
        });
      });

      setData({ ...user, token });
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<ModelUser>("users");
      const response = await userCollection.query().fetch();
      if (response.length > 0) {
        const userData = response[0]._raw as unknown as User;

        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${userData.token}`;

        setData(userData);
      }
    }
    loadUserData();
  });

  return (
    <AuthContext.Provider
      value={{
        user: data,
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
