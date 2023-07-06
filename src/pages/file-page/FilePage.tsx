import {
  getDownloadURL,
  getMetadata,
  listAll,
  ListResult,
  ref,
  StorageReference,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { Data } from "../../common/types/Types";
import FileTable from "./components/FileTable";
import { firebaseStorage } from "../../config/firebase";

export function createData(
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

const handleFileList = (response: ListResult) => {
  return Promise.all(response.items.map(handleFileItem));
};

const handleFileItem = async (item: StorageReference) => {
  const url = await getDownloadURL(item);
  const metadata = await getMetadata(ref(firebaseStorage, item.fullPath));

  return createData(
    metadata.name,
    `${new Date(metadata.timeCreated).toLocaleString()}`,
    metadata.contentType ?? "",
    metadata.size,
    url
  );
};

export const FilePage = () => {
  const fileListRef = ref(firebaseStorage, "files/protocols/");
  const [rows, setRows] = useState<Data[]>([]);

  useEffect(() => {
    listAll(fileListRef)
      .then(handleFileList)
      .then((rows) => setRows(rows));
  }, []);

  return <FileTable rows={rows} setRows={setRows} />;
};
