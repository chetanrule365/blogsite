import { IconButton } from "@material-ui/core";
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
InitializefirebaseApp();
interface blogData {
    title: "title";
    desc: "Description";
    explanation: "Explanation";
    timestamp: "May 3, 2021";
    createdBy: "Chetan";
    thumbnail: "/reactjs_img.png";
    reactCode: string;
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

    return (
        <div className='blogview'>
            <Link href='/'>
                <IconButton style={{ marginLeft: "-8px" }}>
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
                                {moment(blogData?.timestamp).format("ll")}, By{" "}
                                <span>{blogData?.createdBy}</span>
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
                        <p id='inDetail' style={{ marginTop: "10px" }}></p>
                        <div id='thumbnail'>
                            <img src={blogData?.thumbnail} alt='' />
                        </div>
                        <CodeMaker code={blogData?.reactCode} />
                    </div>
                </>
            )}
        </div>
    );
}

export default blogspage;
