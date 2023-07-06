import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";
import { UserAuth } from "../../common/contexts/AuthContext";
import HomePost from "./components/HomePost";
import NewsCard from "./components/NewsCard";

const HomePage = () => {
  const { getNewsCollection } = UserAuth();
  const { data: newsPosts } = useQuery<DocumentData[]>(["newsPosts"], () =>
    getNewsCollection("newsPost")
  );

  return (
    <Grid container maxWidth="lg">
      <Grid item sm={9}>
        <HomePost />
      </Grid>
      <Grid item sm={3}>
        {newsPosts?.slice(0, 3)?.map((posts) => (
          <NewsCard
            key={posts.id}
            title={posts.title}
            date={posts.date.toDate()}
            text={posts.text }
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default HomePage;
