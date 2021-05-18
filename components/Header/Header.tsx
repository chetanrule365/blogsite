import { Avatar, Button, IconButton } from "@material-ui/core";
import { CloseRounded, Menu, Search } from "@material-ui/icons";
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
                            <Button className='switch'>Switch to {text}</Button>
                        </Link>
                    ) : (
                        <>
                            <Link href='/tutorials'>
                                <Button>Tutorials</Button>
                            </Link>
                            <Link href='/'>
                                <Button>Blogs</Button>
                            </Link>
                        </>
                    )}
                </div>
                {!user ? (
                    <Link href='/login'>
                        <Button className='signin_butt'>Log In</Button>
                    </Link>
                ) : (
                    <>
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
                                    src={`${
                                        firebase.auth().currentUser?.photoURL
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
                    {switchURL ? (
                        <Link href={switchURL}>
                            <Button>
                                <p>Switch to {text}</p>
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
