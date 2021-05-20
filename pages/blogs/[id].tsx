import { Button, IconButton } from "@material-ui/core";
import {
    ArrowBackOutlined,
    FavoriteBorderRounded,
    FavoriteRounded,
    MoreHorizRounded,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import CodeMaker from "../../components/CodeMaker/CodeMaker";
import { useRouter } from "next/router";
import moment from "moment";
import Loader from "../../components/Loader/Loader";
import firebase from "firebase";
import InitializefirebaseApp from "../../services/InitializefirebaseApp";
import Link from "next/link";
import SimpleHeader from "../../components/Header/SimpleHeader";
import Head from "next/head";
InitializefirebaseApp();
interface blogData {
    title: "title";
    desc: "Description";
    explanation: "Explanation";
    timestamp: "May 3, 2021";
    createdBy: "Chetan";
    thumbnail: "/reactjs_img.png";
    isReact: boolean;
    reactCode: string;
    scssCode: string;
    jsCode: string;
}
function blogspage() {
    const router = useRouter();
    const { id } = router.query;
    const [blogData, setblogData] =
        useState<blogData | firebase.firestore.DocumentData>();
    const [loading, setloading] = useState(true);
    useEffect(() => {
        if (id) {
            firebase
                .firestore()
                .collection("frontEndBlogs")
                .doc(`${id}`)
                .get()
                .then((data) => {
                    setblogData(data.data());
                    setloading(false);
                    const ele = document.getElementById("inDetail");
                    if (ele) {
                        ele.textContent = data.data()?.inDetail;
                        ele.innerHTML = ele.innerHTML.replace(/\n/g, "<br>\n");
                    }
                });
        }
    }, [id]);
    const [isFavourite, setIsFavourite] = useState(false);
    const [seg_tab, setseg_tab] = useState("react");
    return (
        <>
            <Head>
                <title>TechBlog/Blog</title>
            </Head>
            <div className='blogview'>
                <SimpleHeader />
                <Link href='/'>
                    <IconButton style={{ marginLeft: "-16px" }}>
                        <ArrowBackOutlined />
                    </IconButton>
                </Link>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <p className='title'>{blogData?.title} </p>
                        <div className='desc'>
                            <p>{blogData?.desc}</p>
                            <div className='bottom'>
                                <p>
                                    {moment(blogData?.timestamp).format("ll")},
                                    By <span>{blogData?.createdBy}</span>
                                </p>
                                <div className='acts'>
                                    <IconButton
                                        className='fav_btn'
                                        onClick={async () => {
                                            setIsFavourite(!isFavourite);
                                        }}>
                                        {isFavourite ? (
                                            <FavoriteRounded />
                                        ) : (
                                            <FavoriteBorderRounded />
                                        )}
                                    </IconButton>

                                    <IconButton
                                        className='icon_butt'
                                        onClick={() => {}}>
                                        <MoreHorizRounded />
                                    </IconButton>
                                </div>
                            </div>
                            <hr />

                            <div id='thumbnail'>
                                <img src={blogData?.thumbnail} alt='' />
                            </div>
                            <p id='inDetail' style={{ marginTop: "10px" }}></p>
                            <div className='code-con'>
                                <div className='segment'>
                                    <Button
                                        onClick={() => setseg_tab("react")}
                                        className={
                                            seg_tab === "react" ? "active" : ""
                                        }>
                                        Html
                                    </Button>
                                    <Button
                                        onClick={() => setseg_tab("css")}
                                        className={
                                            seg_tab === "css" ? "active" : ""
                                        }>
                                        CSS
                                    </Button>
                                    {!blogData?.isReact && (
                                        <Button
                                            onClick={() => setseg_tab("js")}
                                            className={
                                                seg_tab === "js" ? "active" : ""
                                            }>
                                            Js
                                        </Button>
                                    )}
                                </div>
                                <CodeMaker
                                    code={
                                        seg_tab === "react"
                                            ? blogData?.reactCode
                                            : seg_tab === "css"
                                            ? blogData?.scssCode
                                            : blogData?.jsCode
                                    }
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default blogspage;
