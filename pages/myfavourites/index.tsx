import { IconButton } from "@material-ui/core";
import { ArrowBackRounded } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
import Loader from "../../components/Loader/Loader";
import firebase from "firebase";
import InitializefirebaseApp from "../../services/InitializefirebaseApp";
import Link from "next/link";
import SimpleHeader from "../../components/Header/SimpleHeader";
InitializefirebaseApp();
function MyFavourites() {
    const [myfavBlogs, setMyFavBlogs] = useState<
        firebase.firestore.QueryDocumentSnapshot[]
    >([]);
    const [cblog, setCBlog] = useState();
    const [loading, setLoading] = useState(true);
    const [showActionSheet, setShowActionSheet] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [reportType, setReportType] = useState("Spam");

    useEffect(() => {
        firebase
            .firestore()
            .collection("frontEndBlogs")
            .limit(5)
            .orderBy("timestamp", "desc")
            .get()
            .then((res) => {
                setMyFavBlogs(res.docs.map((doc) => doc));
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);
    return (
        <>
            <SimpleHeader />
            <div className='myfavourites-con'>
                <header>
                    <Link href='/'>
                        <IconButton>
                            <ArrowBackRounded />
                        </IconButton>
                    </Link>
                    <h2>My Favourites</h2>
                </header>

                {loading ? (
                    <Loader />
                ) : (
                    <div className='myfavourites'>
                        {myfavBlogs.length > 0 ? (
                            <div className='normal_cards'>
                                {myfavBlogs.map((blog) => (
                                    <BlogCard blog={blog} isFav={true} />
                                ))}
                            </div>
                        ) : (
                            <div className='empty'>
                                <img src='/assets/empty.svg' alt='empty' />
                                <p>No Data..</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default MyFavourites;
