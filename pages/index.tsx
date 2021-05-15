import { CodeRounded, TrendingUpRounded } from "@material-ui/icons";
import Head from "next/head";
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard/BlogCard";
import Header from "../components/Header/Header";
import TrendingCard from "../components/TrendingCard/TrendingCard";
import firebase from "firebase";
import InitializefirebaseApp from "../services/InitializefirebaseApp";
InitializefirebaseApp();
export default function Blogspage() {
    const [blogs, setblogs] = useState<any[]>([]);
    useEffect(() => {
        firebase
            .firestore()
            .collection("frontEndBlogs")
            .get()
            .then((res) => {
                setblogs(res.docs.map((doc) => doc));
            });
    }, []);
    return (
        <div className='home'>
            <Head>
                <title>TechBlog</title>
            </Head>
            <Header switchURL='/tutorials' />

            <div className='headline'>
                <TrendingUpRounded />
                <p>Trending</p>
            </div>
            <div className='trending-cards'>
                <TrendingCard
                    sno='01'
                    title='ReactJs Blog'
                    timestamp='Feb 4, 2021'
                    user='chetan'
                    url='/blogview'
                />
                <TrendingCard
                    sno='02'
                    title='NextJs Blog'
                    timestamp='Apr 14, 2021'
                    user='chetan'
                    url='/'
                />
                <TrendingCard
                    sno='03'
                    title='SCSS Blog'
                    timestamp='May 3, 2021'
                    user='chetan'
                    url='/'
                />
            </div>
            <div className='headline'>
                <CodeRounded />
                <p>Web Dev</p>
            </div>
            <div className='blog-cards'>
                {blogs.map((doc) => (
                    <BlogCard blog={doc} key={doc.id} />
                ))}
            </div>
        </div>
    );
}
