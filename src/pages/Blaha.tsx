import UploadFile from "../components/UploadFile";
import { useEffect, useState } from "react";
import { firebaseStorage } from "../config/firebase";
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";
import FileTable from "../components/FileTable";

export interface Data {
  fileName: string;
  date: string;
  fileType: string;
  fileSize: number;
  url: string;
}

function createData(
  fileName: string,
  date: string,
  fileType: string,
  fileSize: number,
  url: string
): Data {
  return {
    fileName,
    date,
    fileType,
    fileSize,
    url,
  };
}

export const Blaha = () => {
  console.log("blaha page rendered")
  return (
    <>
      <h1>hej</h1>
    </>
  );
};
