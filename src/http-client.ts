import {signOut} from "firebase/auth";
import {auth} from "./config/firebase"

export function logOut() {
    signOut(auth).then(() => {
        console.log("signed out")
        return true
    }).catch((error) => {
        console.log("error ", error.message)
        return false
    });
}
