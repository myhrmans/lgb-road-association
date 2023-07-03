export interface Data {
  fileName: string;
  date: string;
  fileType: string;
  fileSize: number;
  url: string;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

export interface NewsData {
  title: string;
  date: Date;
  text: string;
}


export type Order = "asc" | "desc";
