import { Avatar, Button, IconButton } from "@material-ui/core";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import firebase from "firebase";
import InitializefirebaseApp from "../../services/InitializefirebaseApp";
import {
    ArrowForward,
    Book,
    CloseRounded,
    ExitToApp,
    FavoriteRounded,
    LibraryBooks,
    Publish,
    Search,
} from "@material-ui/icons";
InitializefirebaseApp();
function SimpleHeader() {
    const [user, setUser] = useState<firebase.UserInfo>();
    const [pathname, setpathname] = useState("");
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                setUser(undefined);
                localStorage.setItem("uid", "");
                window.location.reload();
            } else {
                setUser(user);
                localStorage.setItem("uid", user.uid);
            }
        });
        setpathname(window.location.pathname);
    }, []);
    return (
        <header className='main-header-con'>
            <div className='main-header'>
                <div className='left'>
                    <Link href='/'>
                        <img src='/vercel.svg' alt='logo' className='logo' />
                    </Link>
                    <hr />
                    <p className='greet'>
                        <em>Good Morning! </em>
                        {firebase.auth().currentUser?.displayName || "New User"}
                    </p>
                </div>
                <div className='right-con'>
                    <div id='right'>
                        {pathname !== "/login" && (
                            <div className='search'>
                                <input type='text' placeholder='Search' />
                                <Search />
                            </div>
                        )}
                    </div>
                    {!user ? (
                        pathname === "/login" ? null : (
                            <Link href='/login'>
                                <Button className='signin_butt'>
                                    Log&nbsp;In
                                </Button>
                            </Link>
                        )
                    ) : (
                        <IconButton
                            onClick={() => {
                                const ele = document.getElementById("sidemenu");
                                if (ele) {
                                    ele.classList.toggle("show");
                                }
                            }}>
                            <Avatar
                                src={`${firebase.auth().currentUser?.photoURL}`}
                            />
                        </IconButton>
                    )}
                </div>
            </div>

            <div id='sidemenu'>
                <header>
                    <img src='/vercel.svg' alt='' />
                    <IconButton
                        className='back'
                        onClick={() => {
                            const ele = document.getElementById("sidemenu");
                            if (ele) {
                                ele.classList.toggle("show");
                            }
                        }}>
                        <CloseRounded />
                    </IconButton>
                </header>
                {user && (
                    <Link href='/profile'>
                        <div className='profile'>
                            <div className='info'>
                                <IconButton>
                                    <Avatar
                                        src={`${
                                            firebase.auth().currentUser
                                                ?.photoURL
                                        }`}
                                    />
                                </IconButton>
                                <div className='name'>
                                    {firebase.auth().currentUser?.displayName}
                                </div>
                            </div>
                            <IconButton>
                                <ArrowForward />
                            </IconButton>
                        </div>
                    </Link>
                )}
                <div className='tabs'>
                    <Link href='/tutorials'>
                        <div className='tab-btn'>
                            <IconButton>
                                <Book />
                            </IconButton>
                            <p>Tutorials</p>
                        </div>
                    </Link>
                    <Link href='/'>
                        <div className='tab-btn'>
                            <IconButton>
                                <LibraryBooks />
                            </IconButton>
                            <p>Blogs</p>
                        </div>
                    </Link>
                    {!user ? (
                        <Link href='/login'>
                            <Button className='signin_butt'>
                                <p>Log In</p>
                            </Button>
                        </Link>
                    ) : (
                        <>
                            <Link href='/myblogs'>
                                <div className='tab-btn'>
                                    <IconButton>
                                        <LibraryBooks />
                                    </IconButton>
                                    <p>My Blogs</p>
                                </div>
                            </Link>
                            <Link href='/myfavourites'>
                                <div className='tab-btn'>
                                    <IconButton>
                                        <FavoriteRounded />
                                    </IconButton>
                                    <p>My Favourites</p>
                                </div>
                            </Link>
                            <Link href='/publish'>
                                <div className='tab-btn'>
                                    <IconButton>
                                        <Publish />
                                    </IconButton>
                                    <p>Publish Blog</p>
                                </div>
                            </Link>
                            <div
                                className='tab-btn'
                                onClick={() => {
                                    localStorage.clear();
                                    firebase.auth().signOut();
                                }}>
                                <IconButton>
                                    <ExitToApp />
                                </IconButton>
                                <p>Log Out</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default SimpleHeader;
