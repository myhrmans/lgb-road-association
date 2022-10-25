import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { getAuth } from "firebase/auth"
import { getStorage, ref } from "firebase/storage";
import { getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore"

export const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
}
const app = firebase.initializeApp(firebaseConfig)

export const auth = getAuth(app);
//export default app

// Get a reference to the storage service, which is used to create references in your storage bucket
export const firebaseStorage = getStorage(app);

// Create a storage reference from our storage service
export const storageRef = ref(firebaseStorage);

export const db = getFirestore(app);
