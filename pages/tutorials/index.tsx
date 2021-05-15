import { CodeRounded, TrendingUpRounded } from "@material-ui/icons";
import Head from "next/head";
import Header from "../../components/Header/Header";
import TrendingCard from "../../components/TrendingCard/TrendingCard";
import TutorialCard from "../../components/TutorialCard/TutorialCard";
export default function Tutorialspage() {
    return (
        <div className='home'>
            <Head>
                <title>TechBlog</title>
            </Head>
            <Header switchURL='/' />
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
                    url='/tutorials/react'
                />
                <TrendingCard
                    sno='02'
                    title='NextJs Tutorial'
                    timestamp='Apr 14, 2021'
                    user='chetan'
                    url='/tutorials'
                />
                <TrendingCard
                    sno='03'
                    title='SCSS Tutorial'
                    timestamp='May 3, 2021'
                    user='chetan'
                    url='/tutorials'
                />
            </div>
            <div className='headline'>
                <CodeRounded />
                <p>Web Dev</p>
            </div>
            <div className='blog-cards'>
                <TutorialCard
                    title='ReactJs Tutorial'
                    desc='Learn ReactJs.'
                    timestamp='Feb 4, 2021'
                    user='chetan'
                    thumbnail='/reactjs_img.png'
                    url='/tutorials/react'
                />
                <TutorialCard
                    title='NextJs Tutorial'
                    desc='Learn NextJs.'
                    timestamp='Apr 14, 2021'
                    user='chetan'
                    thumbnail='/nextjs.jpg'
                    url='/tutorials'
                />
                <TutorialCard
                    title='SCSS Tutorial'
                    desc='Learn SCSS.'
                    timestamp='May 3, 2021'
                    user='chetan'
                    thumbnail='/scss.png'
                    url='/tutorials'
                />
            </div>
        </div>
    );
}
