import { Divider, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";
import { UserAuth } from "../common/contexts/AuthContext";
import NewsPost from "../components/NewsPost";

export default function NewsPage() {
  const { getNewsCollection } = UserAuth();
  const { data } = useQuery<DocumentData[]>(["newsPosts"], () =>
    getNewsCollection("newsPost")
  );

  return (
    <>
      {data?.map((post) => (
        <Grid key={post.id} item sm={8} mt={4}>
          <NewsPost
            title={post.title}
            date={post.date.toDate()}
            text={post.text}
          />
          <Divider />
        </Grid>
      ))}
    </>
  );
}
