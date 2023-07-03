import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import {
  browserSessionPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential
} from "firebase/auth";
import {
  collection, DocumentData,
  getDocs
} from "firebase/firestore";
import { deleteObject, ref, uploadBytes, UploadResult } from "firebase/storage";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";
import { auth, db, storageRef } from "../../config/firebase";
import { Data } from "../types/Types";

export type AuthContextType = {
  user: User | null;
  role: any | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  downloadFile: (row: Data) => Promise<void>;
  deleteFile: (fileName: string) => Promise<void>;
  uploadFile: (file: File) => Promise<UploadResult | undefined>;
  getNewsCollection: (col: string) => Promise<DocumentData[]>;
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
    const filesRef = ref(storageRef, `files/protocols/${fileName}`);

    await deleteObject(filesRef);
  };

  const uploadFile = async (file: File) => {
    const filesRef = ref(storageRef, `files/protocols/${file.name}`);

    return await uploadBytes(filesRef, file)
      .then((snapshot) => {
        return snapshot;
      })
      .catch((error) => {
        console.log("Upload error", error);
        return undefined;
      });
  };

  const getNewsCollection = async (col: string) => {
    const colRef = collection(db, col);

    return await getDocs(colRef).then((snapshot) => {
      let data: DocumentData[] = [];
      snapshot.docs.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      return data;
    });
  };

  const contextValue = {
    user,
    role,
    login,
    logout,
    downloadFile,
    deleteFile,
    uploadFile,
    getNewsCollection,
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
