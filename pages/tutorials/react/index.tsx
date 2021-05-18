import { CloseRounded, Menu } from "@material-ui/icons";
import Head from "next/head";
import SideMenu from "../../../components/SideMenu/SideMenu";
import { react_sidemenu_data } from "../../../components/SideMenu/sideMenu_data";
import { useEffect } from "react";
import Link from "next/link";
import Header from "../../../components/Header/Header";
export default function index() {
    let sidemenu: HTMLElement | null;
    let mainContent: HTMLElement | null;
    const toggleMenu = () => {
        sidemenu?.classList.toggle("hide");
        mainContent?.classList.toggle("extend");
    };
    useEffect(() => {
        sidemenu = document.getElementById("side-menu");
        mainContent = document.getElementById("main-content");
        setTimeout(() => {
            if (window.innerWidth <= 750) toggleMenu();
        }, 700);
    }, []);
    return (
        <>
            <Head>
                <title>React Tutorial</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <div className='tutorial-content'>
                <Header switchURL='' />
                <div className='content-con'>
                    <div id='side-menu'>
                        <div className='bg-dup'></div>
                        <header>
                            <Link href='/tutorials/react'>
                                <p>React Tutorial</p>
                            </Link>
                            <div
                                id='menubtn-close'
                                onClick={() => toggleMenu()}>
                                <CloseRounded className='btn' />
                            </div>
                        </header>
                        <SideMenu data={react_sidemenu_data} activeEle={null} />
                    </div>
                    <main id='main-content'>
                        <div id='menubtn-open' onClick={() => toggleMenu()}>
                            <Menu className='btn' />
                        </div>
                        <div className='content'>
                            <h2>Welcome to React tutorial</h2>
                            <p>
                                React is a Javascript library for building user
                                interfaces.
                            </p>
                            <h3>Benefits of using React Js.</h3>
                            <ul>
                                <li>PWA</li>
                                <li>SPA</li>
                                <li>Easy state management.</li>
                                <li>Easy component management.</li>
                                <li>
                                    Learn once, write anywhere. We can use React
                                    Js over many popular frameworks like Ionic,
                                    Next.js, Gastby.js and many more.
                                </li>
                            </ul>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
