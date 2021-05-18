import { Avatar, Button, IconButton } from "@material-ui/core";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import firebase from "firebase";
import InitializefirebaseApp from "../../services/InitializefirebaseApp";
import { CloseRounded, Search } from "@material-ui/icons";
InitializefirebaseApp();
function SimpleHeader() {
    const [user, setUser] = useState<firebase.UserInfo>();
    const [pathname, setpathname] = useState("");
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                setUser(undefined);
                localStorage.setItem("uid", "");
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
                        {firebase.auth().currentUser?.displayName}
                    </p>
                </div>
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
                            <Button className='signin_butt'>Log In</Button>
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
                        {firebase.auth().currentUser?.photoURL ? (
                            <img
                                className='avatar'
                                src={`${firebase.auth().currentUser?.photoURL}`}
                                alt=''
                            />
                        ) : (
                            <Avatar />
                        )}
                    </IconButton>
                )}
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
                    <div className='profile'>
                        <IconButton>
                            {firebase.auth().currentUser?.photoURL ? (
                                <img
                                    className='avatar'
                                    src={`${
                                        firebase.auth().currentUser?.photoURL
                                    }`}
                                    alt=''
                                />
                            ) : (
                                <Avatar
                                    style={{ width: "80px", height: "80px" }}
                                />
                            )}
                        </IconButton>
                        <Link href='/profile'>
                            <Button>Profile</Button>
                        </Link>
                    </div>
                )}
                <div className='tabs'>
                    <Link href='/tutorials'>
                        <Button>
                            <p>Tutorials</p>
                        </Button>
                    </Link>
                    <Link href='/'>
                        <Button>
                            <p>Blogs</p>
                        </Button>
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
                                <Button>
                                    <p>My Blogs</p>
                                </Button>
                            </Link>
                            <Link href='/myfavourites'>
                                <Button>
                                    <p>My Favourites</p>
                                </Button>
                            </Link>
                            <Link href='/publish'>
                                <Button>
                                    <p>Publish Blog</p>
                                </Button>
                            </Link>
                            <Button
                                className='signin_butt'
                                onClick={() => {
                                    localStorage.clear();
                                    firebase.auth().signOut();
                                }}>
                                <p>Log Out</p>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default SimpleHeader;
