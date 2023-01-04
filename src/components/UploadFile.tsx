import Button from "@mui/material/Button";
import { useState } from "react";
import { firebaseStorage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export default function UploadFile(params: {
  setFileList: (fileList: any) => void;
}) {
  const [fileUpload, setFileUpload] = useState<any | null>(null);

  const uploadFile = () => {
    if (fileUpload == null) return;
    const fileRef = ref(
      firebaseStorage,
      `files/protocols/${fileUpload.name + v4()}`
    );
    uploadBytes(fileRef, fileUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        params.setFileList((prev: any) => [...prev, url]);
      });
    });
  };

  return (
    <>
    </>
  );
}
