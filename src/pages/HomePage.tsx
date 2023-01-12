import { useEffect, useState } from "react";
import HomeImagePost from "../components/HomeImagePost";
import { firebaseStorage } from "../config/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { Grid } from "@mui/material";
import NewsPaper from "../components/NewsPaper";
import NewsCard from "../components/NewsCard";

const HomePage = () => {
  const [url, setUrl] = useState<string>("");
  const imageRef = ref(firebaseStorage, "images/cow.jpg");

  const mainPicturePost = {
    title: "Välkommen till Lassagårdsbergs Vägförening",
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: url,
    imageText: "main image description",
  };

  useEffect(() => {
    const func = async () => {
      await getDownloadURL(imageRef)
        .then((x) => {
          setUrl(x);
        })
        .catch((error) => {});
    };
    func();
  }, []);

  return (
    <Grid container rowGap={5}>
      <Grid item xs={12}>
        <HomeImagePost post={mainPicturePost} />
      </Grid>
      <Grid container direction="column" alignItems="flex-end">
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </Grid>
    </Grid>
  );
};

export default HomePage;
