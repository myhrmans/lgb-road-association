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

export const FilePage = () => {
  const [fileList, setFileList] = useState<any>([]);
  const fileListRef = ref(firebaseStorage, "files/protocols/");
  const [rows, setRows] = useState<Data[]>([]);

  useEffect(() => {
    listAll(fileListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          getMetadata(ref(firebaseStorage, item.fullPath)).then((metadata) => {
            setRows((prev: Data[]) => [
              ...prev,
              createData(
                metadata.name,
                `${new Date(metadata.timeCreated).toLocaleString()}`,
                metadata.contentType ?? "",
                metadata.size,
                url
              ),
            ]);
          });
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
      {/* {fileList.map((url: any) => {})} */}
      <FileTable rows={rows} />
    </>
  );
};
