import { Avatar, Button, IconButton } from "@material-ui/core";
import {
    ArrowForward,
    Book,
    CloseRounded,
    ExitToApp,
    FavoriteRounded,
    LibraryBooks,
    Menu,
    Publish,
    Search,
} from "@material-ui/icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import firebase from "firebase";
import InitializefirebaseApp from "../../services/InitializefirebaseApp";
InitializefirebaseApp();
interface header {
    switchURL: string;
}
export default function Header({ switchURL }: header) {
    const text = switchURL === "/tutorials" ? "Tutorials" : "Blogs";
    const [user, setUser] = useState<firebase.UserInfo>();
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
                <div className='right-con'>
                    <div id='right'>
                        <div className='search'>
                            <input type='text' placeholder='Search' />
                            <Search />
                        </div>
                        {/* <Link href='/aboutus'>
                                <Button>About Us</Button>
                            </Link> */}
                        {switchURL ? (
                            <Link href={switchURL}>
                                <Button className='switch'>
                                    Switch to {text}
                                </Button>
                            </Link>
                        ) : (
                            <>
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
                            </>
                        )}
                    </div>
                    {!user ? (
                        <Link href='/login'>
                            <Button className='signin_butt'>Log&nbsp;In</Button>
                        </Link>
                    ) : (
                        <>
                            <IconButton
                                onClick={() => {
                                    const ele =
                                        document.getElementById("sidemenu");
                                    if (ele) {
                                        ele.classList.toggle("show");
                                    }
                                }}>
                                {firebase.auth().currentUser?.photoURL ? (
                                    <img
                                        className='avatar'
                                        src={`${
                                            firebase.auth().currentUser
                                                ?.photoURL
                                        }`}
                                        alt=''
                                    />
                                ) : (
                                    <Avatar />
                                )}
                            </IconButton>
                        </>
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
                                    {firebase.auth().currentUser?.photoURL ? (
                                        <img
                                            className='avatar'
                                            src={`${
                                                firebase.auth().currentUser
                                                    ?.photoURL
                                            }`}
                                            alt=''
                                        />
                                    ) : (
                                        <Avatar className='avatar' />
                                    )}
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
                    {switchURL ? (
                        <Link href={switchURL}>
                            <Button className='switch'>
                                <p>Switch to {text}</p>
                            </Button>
                        </Link>
                    ) : (
                        <>
                            <Link href='/tutorials'>
                                <div className='tab-btn'>
                                    <IconButton>
                                        <LibraryBooks />
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
                        </>
                    )}
                    {/* <Link href='/aboutus'>
                                <Button className='switch'>About Us</Button>
                            </Link> */}
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
