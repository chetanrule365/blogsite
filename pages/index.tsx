import { CodeRounded, TrendingUpRounded } from "@material-ui/icons";
import Head from "next/head";
import BlogCard from "../components/BlogCard/BlogCard";
import TrendingCard from "../components/TrendingCard/TrendingCard";
export default function Home() {
    return (
        <div className='home'>
            <Head>
                <title>TechBlog</title>
            </Head>
            <div className='headline'>
                <TrendingUpRounded />
                <p>Trending</p>
            </div>
            <div className='trending-cards'>
                <TrendingCard
                    sno='01'
                    title='ReactJs Tutorial'
                    timestamp='Feb 4, 2021'
                    user='chetan'
                    url='/react'
                />
                <TrendingCard
                    sno='02'
                    title='NextJs Tutorial'
                    timestamp='Apr 14, 2021'
                    user='chetan'
                    url='/'
                />
                <TrendingCard
                    sno='03'
                    title='SCSS Tutorial'
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
                <BlogCard
                    title='ReactJs Tutorial'
                    desc='Learn ReactJs.'
                    timestamp='Feb 4, 2021'
                    user='chetan'
                    thumbnail='/reactjs_img.png'
                    url='/'
                />
                <BlogCard
                    title='NextJs Tutorial'
                    desc='Learn NextJs.'
                    timestamp='Apr 14, 2021'
                    user='chetan'
                    thumbnail='/nextjs.jpg'
                    url='/'
                />
                <BlogCard
                    title='SCSS Tutorial'
                    desc='Learn SCSS.'
                    timestamp='May 3, 2021'
                    user='chetan'
                    thumbnail='/scss.png'
                    url='/'
                />
            </div>
        </div>
    );
}
