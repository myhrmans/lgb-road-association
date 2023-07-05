import { Divider, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { DocumentData, Timestamp } from 'firebase/firestore';
import { UserAuth } from '../../common/contexts/AuthContext';
import Post from './components/Post';
import NewPost from './components/NewPost';
import { useState } from 'react';

export default function NewsPage() {
    const { getNewsCollection } = UserAuth();
    let { data } =  useQuery<DocumentData[]>(['newsPosts'], () => getNewsCollection('newsPost'));
    const [posts, setPosts] = useState<DocumentData[]>([])

    const onSubmit = (heading: string, text: string) => {
       setPosts([{date: new Timestamp(0,0), text: text, title: heading}, ...(posts ?? [])])
       console.log("onsubmit", posts)
    }

    

    return (
        <Grid container item >
            <Grid item sm={8} mt={4}>
                <NewPost onSubmit={onSubmit} />
            </Grid>
            {posts.concat(data ?? []).map((post) => (
                <Grid item key={post.id} sm={8} mt={4}>
                    <Post title={post.title} date={post.date.toDate()} text={post.text} />
                    <Divider />
                </Grid>
            ))}
        </Grid>
    );
}
