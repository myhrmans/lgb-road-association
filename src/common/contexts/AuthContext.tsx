import {
  browserSessionPersistence,
  onAuthStateChanged,
  setPersistence,
  signOut,
  UserCredential,
} from "firebase/auth";
import {
  useState,
  createContext,
  ReactNode,
  FC,
  useEffect,
  useContext,
} from "react";
import { auth } from "../../config/firebase";
import { User, signInWithEmailAndPassword } from "firebase/auth";

export type AuthContextType = {
  user: User | null;
  role: any | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
};

export const UserContext = createContext<AuthContextType>(
  {} as AuthContextType
);

interface UserContextProviderProps {
  children?: ReactNode;
}

export const AuthContextProvider: FC<UserContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    await setPersistence(auth, browserSessionPersistence);
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const contextValue = {
    user,
    role,
    login,
    logout,
  };

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
