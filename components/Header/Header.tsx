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
    const [showRight, setshowRight] = useState(false);
    const [user, setUser] = useState<firebase.UserInfo>();
    useEffect(() => {
        const toggleHeader = () => {
            if (window.innerWidth < 900) {
                setshowRight(false);
            } else {
                setshowRight(true);
            }
        };
        toggleHeader();
        window.addEventListener("resize", () => toggleHeader());
    }, []);
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
        <>
            <header className='main-header-con'>
                <div className='main-header'>
                    <div className='left'>
                        <Link href='/'>
                            <img
                                src='/vercel.svg'
                                alt='logo'
                                className='logo'
                            />
                        </Link>
                        <hr />
                        <p>
                            <em>Good Morning!</em>
                        </p>
                    </div>
                    {showRight ? (
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
                                        <Button>Tutorials</Button>
                                    </Link>
                                    <Link href='/'>
                                        <Button>Blogs</Button>
                                    </Link>
                                </>
                            )}
                            {!user ? (
                                <Link href='/login'>
                                    <Button className='signin_butt'>
                                        Log In
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <IconButton
                                        onClick={() => {
                                            const ele =
                                                document.getElementById(
                                                    "sidemenu",
                                                );
                                            if (ele) {
                                                ele.classList.toggle("show");
                                            }
                                        }}>
                                        <img
                                            className='avatar'
                                            src={`${
                                                firebase.auth().currentUser
                                                    ?.photoURL
                                            }`}
                                            alt=''
                                        />
                                    </IconButton>
                                </>
                            )}
                        </div>
                    ) : (
                        <IconButton
                            className='menuButt'
                            onClick={() => {
                                const ele = document.getElementById("sidemenu");
                                if (ele) {
                                    ele.classList.toggle("show");
                                }
                            }}>
                            <Menu />
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
                    <div className='tabs'>
                        {switchURL ? (
                            <Link href={switchURL}>
                                <Button className='switch'>
                                    Switch to {text}
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Link href='/tutorials'>
                                    <Button className='switch'>
                                        Tutorials
                                    </Button>
                                </Link>
                                <Link href='/'>
                                    <Button className='switch'>Blogs</Button>
                                </Link>
                            </>
                        )}
                        {/* <Link href='/aboutus'>
                                <Button className='switch'>About Us</Button>
                            </Link> */}
                        {!user ? (
                            <Link href='/login'>
                                <Button className='signin_butt'>Log In</Button>
                            </Link>
                        ) : (
                            <>
                                <Button className='switch'>My Blogs</Button>

                                <Button className='switch'>
                                    My Favourites
                                </Button>

                                <Button
                                    className='signin_butt'
                                    onClick={() => {
                                        localStorage.clear();
                                        firebase.auth().signOut();
                                    }}>
                                    Log Out
                                </Button>
                            </>
                        )}
                    </div>
                    <div></div>
                </div>
            </header>
        </>
    );
}
