import { CodeRounded, Search, TrendingUpRounded } from "@material-ui/icons";
import Head from "next/head";
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard/BlogCard";
import Header from "../components/Header/Header";
import TrendingCard from "../components/TrendingCard/TrendingCard";
import firebase from "firebase";
import InitializefirebaseApp from "../services/InitializefirebaseApp";
import Footer from "../components/Footer/Footer";
import Loader from "../components/Loader/Loader";
import { Button } from "@material-ui/core";
InitializefirebaseApp();
export default function Blogspage() {
    const [blogs, setblogs] = useState<any[]>([]);
    const [trending_blogs, settrending_blogs] = useState<any[]>([]);
    const [loading, setloading] = useState(true);
    const [blogCount, setBlogCount] = useState(6);
    useEffect(() => {
        firebase
            .firestore()
            .collection("frontEndBlogs")
            .limit(blogCount)
            .orderBy("timestamp", "desc")
            .get()
            .then((res) => {
                setblogs(res.docs.map((doc) => doc));
                setloading(false);
            });
    }, [blogCount]);
    useEffect(() => {
        settrending_blogs(blogs.slice(0, 6));
    }, [blogs]);
    return (
        <>
            <Head>
                <title>TechBlog</title>
            </Head>
            <div className='home'>
                <Header switchURL='/tutorials' />
                {loading && <Loader />}
                <div className='search-btn'>
                    <input type='text' placeholder='Search' />
                    <Search />
                </div>
                <div className='headline'>
                    <TrendingUpRounded />
                    <p>Trending</p>
                </div>
                <div className='trending-cards'>
                    {trending_blogs.map((blog, x) => (
                        <TrendingCard sno={`0${x + 1}`} blog={blog} />
                    ))}
                </div>
                <div className='headline'>
                    <CodeRounded />
                    <p>Tech Blogs</p>
                </div>
                <div className='content'>
                    <div className='blog-cards'>
                        {blogs.map((doc) => (
                            <BlogCard blog={doc} key={doc.id} />
                        ))}
                        <Button
                            onClick={() => setBlogCount(blogCount + 6)}
                            className='load-more'>
                            Load More
                        </Button>
                    </div>
                    <div className='videos'>
                        <h3>Tech Videos</h3>
                        <iframe
                            width='560'
                            height='315'
                            src='https://www.youtube.com/embed/f-9LEoYYvE4'
                            title='YouTube video player'
                            frameBorder='0'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen></iframe>
                        <iframe
                            width='560'
                            height='315'
                            src='https://www.youtube.com/embed/uWUNZ4u1VLA'
                            title='YouTube video player'
                            frameBorder='0'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen></iframe>
                        <iframe
                            width='560'
                            height='315'
                            src='https://www.youtube.com/embed/YesSVqjcDts'
                            title='YouTube video player'
                            frameBorder='0'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen></iframe>
                        <iframe
                            width='560'
                            height='315'
                            src='https://www.youtube.com/embed/DvpSKoCyN5Q'
                            title='YouTube video player'
                            frameBorder='0'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen></iframe>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
