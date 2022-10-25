import React, {useEffect, useState} from 'react';
import HomeImagePost from "../components/HomeImagePost";
import {firebaseStorage} from "../config/firebase"
import {ref, getDownloadURL} from "firebase/storage";

const HomePage = () => {
    const [url, setUrl] = useState<any>('')
    const imageRef = ref(firebaseStorage, 'images/cow.jpg');

    const mainPicturePost = {
        title: 'Välkommen till Lassagårdsbergs Vägförening',
        description:
            "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
        image: url,
        imageText: 'main image description',
    };

    // useEffect(() => {
    //     const func = async () => {
    //         try {
    //             await getDownloadURL(imageRef)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //         const response = func()
    //         setUrl(response)
    //     }
    // }, []);

    useEffect(() => {
        const func = async () => {
            await getDownloadURL(imageRef)
                .then((x) => {
                    setUrl(x)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        func()
    }, [])

    return (
        <div>
            <HomeImagePost post={mainPicturePost}/>
        </div>
    );
};

export default HomePage