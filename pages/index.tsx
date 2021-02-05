import { CodeRounded, TrendingUpRounded } from "@material-ui/icons";
import Head from "next/head";
import BlogCard from "../components/BlogCard/BlogCard";
import TrendingCard from "../components/TrendingCard/TrendingCard";
export default function Home() {
    return (
        <div className='home'>
            <Head>
                <title>My Blogsite</title>
            </Head>
            <div className='headline'>
                <TrendingUpRounded />
                <p>Trending</p>
            </div>
            <div className='trending-cards'>
                <TrendingCard
                    sno='01'
                    title='React Tutorial'
                    timestamp='Feb 4,2021'
                    user='chetan'
                    url='/react'
                />
            </div>
            <div className='headline'>
                <CodeRounded />
                <p>Web Dev</p>
            </div>
            <div className='blog-cards'>
                <BlogCard
                    title='React Tutorial'
                    desc='Learn React.Js.'
                    timestamp='Feb 4,2021'
                    user='chetan'
                    thumbnail='/reactjs_img.png'
                    url='/react'
                />
            </div>
        </div>
    );
}
