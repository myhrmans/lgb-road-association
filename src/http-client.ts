import {createUserWithEmailAndPassword, signOut} from "firebase/auth";
import {auth, db} from "./config/firebase"
import {addDoc, collection} from "firebase/firestore";

export function logOut() {
    signOut(auth).then(() => {
        console.log("signed out")
        return true
    }).catch((error) => {
        console.log("error ", error.message)
        return false
    });
}

export const registerWithEmailAndPassword = async (name: string, email: string, password: any) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (err: any) {
        console.error(err);
        alert(err.message);
    }
};
