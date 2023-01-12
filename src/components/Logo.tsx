import React, { useEffect, useState } from 'react';
import HomeImagePost from "../components/HomeImagePost";
import { firebaseStorage } from "../config/firebase"
import { ref, getDownloadURL } from "firebase/storage";

export const Logo = () => {
    const [url, setUrl] = useState<any>('')
    const imageRef = ref(firebaseStorage, 'images/logo.jpeg');

    useEffect(() => {
        const func = async () => {
            await getDownloadURL(imageRef)
                .then((x) => {
                    setUrl(x)
                })
                .catch((error) => {
                })
        }
        func()
    }, [])
    
    return(<img style={{width: "80px"}} src={url} alt="logo"/>)
}