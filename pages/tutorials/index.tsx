import { CodeRounded, TrendingUpRounded } from "@material-ui/icons";
import Head from "next/head";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import TrendingCard from "../../components/TrendingCard/TrendingCard";
import TutorialCard from "../../components/TutorialCard/TutorialCard";
export default function Tutorialspage() {
    return (
        <>
            <Head>
                <title>TechBlog</title>
            </Head>
            <div className='home'>
                <Header switchURL='/' />
                <div className='headline'>
                    <TrendingUpRounded />
                    <p>Trending</p>
                </div>
                <div className='trending-cards'>
                    <TrendingCard
                        manualData={{
                            sno: "01",
                            title: "ReactJs Tutorial",
                            timestamp: "May 3, 2021",
                            createdBy: "chetan",
                            url: "/tutorials/react",
                        }}
                    />
                    <TrendingCard
                        manualData={{
                            sno: "02",
                            title: "NextJs Tutorial",
                            timestamp: "Feb 20, 2021",
                            createdBy: "chetan",
                            url: "/tutorials",
                        }}
                    />
                    <TrendingCard
                        manualData={{
                            sno: "03",
                            title: "SCSS Tutorial",
                            timestamp: "May 10, 2021",
                            createdBy: "chetan",
                            url: "/tutorials",
                        }}
                    />
                </div>
                <div className='headline'>
                    <CodeRounded />
                    <p>Web Dev</p>
                </div>
                <div className='content'>
                    <div className='blog-cards'>
                        <TutorialCard
                            title='ReactJs Tutorial'
                            desc='Learn ReactJs.'
                            timestamp='May 3, 2021'
                            user='chetan'
                            thumbnail='/reactjs_img.png'
                            url='/tutorials/react'
                        />
                        <TutorialCard
                            title='NextJs Tutorial'
                            desc='Learn NextJs.'
                            timestamp='Feb 20, 2021'
                            user='chetan'
                            thumbnail='/nextjs.jpg'
                            url='/tutorials'
                        />
                        <TutorialCard
                            title='SCSS Tutorial'
                            desc='Learn SCSS.'
                            timestamp='May 10, 2021'
                            user='chetan'
                            thumbnail='/scss.png'
                            url='/tutorials'
                        />
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
