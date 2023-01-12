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
import { auth, storageRef } from "../../config/firebase";
import { User, signInWithEmailAndPassword } from "firebase/auth";
import { Data } from "../types/Types";
import { deleteObject, ref } from "firebase/storage";

export type AuthContextType = {
  user: User | null;
  role: any | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  downloadFile: (row: Data) => Promise<void>;
  deleteFile: (fileName: string) => void;
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

  const downloadFile = async (row: Data) => {
    const image = await fetch(row.url);
    const imageBlob = await image.blob();
    const imageURL = URL.createObjectURL(imageBlob);
    const anchor = document.createElement("a");

    anchor.href = imageURL;
    anchor.download = row.fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    URL.revokeObjectURL(imageURL);
  };

  const deleteFile = async (fileName: string) => {
    const fileRef = ref(storageRef, `files/protocols/${fileName}`);

    await deleteObject(fileRef)
      .then(() => {
        console.log("file deleted");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const contextValue = {
    user,
    role,
    login,
    logout,
    downloadFile,
    deleteFile,
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
