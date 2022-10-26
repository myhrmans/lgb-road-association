import UploadFile from "../components/UploadFile";
import { useEffect, useState } from "react";
import { firebaseStorage } from "../config/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

export const FilePage = () => {
  const [fileList, setFileList] = useState<any>([]);
  const fileListRef = ref(firebaseStorage, "files/protocols/");

  useEffect(() => {
    listAll(fileListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setFileList((prev: any) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <>
      <UploadFile
        setFileList={(newFileList: any) => {
          setFileList(newFileList);
        }}
      />
      {fileList.map((url: any) => {
        return <img style={{ width: "200px" }} src={url} />;
      })}
    </>
  );
};
