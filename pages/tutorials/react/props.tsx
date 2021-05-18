import { CloseRounded, Menu } from "@material-ui/icons";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect } from "react";
import SideMenu from "../../../components/SideMenu/SideMenu";
import { react_sidemenu_data } from "../../../components/SideMenu/sideMenu_data";
import Header from "../../../components/Header/Header";
function props() {
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
                <title>Functional components in React.js</title>
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
                        <SideMenu data={react_sidemenu_data} activeEle={6} />
                    </div>
                    <main id='main-content'>
                        <div id='menubtn-open' onClick={() => toggleMenu()}>
                            <Menu className='btn' />
                        </div>
                        <div className='content'>
                            <h3>Props in ReactJs</h3>
                            <li>
                                Data passed to components in JavaScript are
                                called props.
                            </li>
                            <li>
                                Props look identical to attributes on plain
                                JSX/HTML elements, but you can access their
                                values within the component itself.
                            </li>
                            <li>
                                Props are available in parameters of the
                                component to which they are passed. Props are
                                always included as properties of an object.
                            </li>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default props;
