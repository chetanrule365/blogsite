import { CloseRounded, Menu } from "@material-ui/icons";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import SideMenu from "../../../components/SideMenu/SideMenu";
import { react_sidemenu_data } from "../../../components/SideMenu/sideMenu_data";
import Header from "../../../components/Header/Header";
export default function stripping_the_folders() {
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
                <title>Stripping the folders</title>
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
                        <SideMenu data={react_sidemenu_data} activeEle={2} />
                    </div>
                    <main id='main-content'>
                        <div id='menubtn-open' onClick={() => toggleMenu()}>
                            <Menu className='btn' />
                        </div>
                        <div className='content'>
                            <h2>Look into folders.</h2>
                            <p>
                                create-react-app created some default files and
                                folders. Lets look into those things.
                            </p>
                            <h3>1. node_modules</h3>
                            <p>
                                'node_modules' is the folder where all the app
                                dependencies are installed.
                            </p>
                            <img src='/assets/folders-info/1.png' alt='1.png' />
                            <h3>2. public folder</h3>
                            <p>
                                'Public folder' contains index.html(which is the
                                root file that runs on starting the server),
                                manifest.json and assests(ex: logos).
                            </p>
                            <img src='/assets/folders-info/2.png' alt='2.png' />
                            <h3>3. src folder</h3>
                            <p>
                                'src folder' is the folder where all our coding
                                goes in. We create all the components related to
                                the app in this folder.
                            </p>
                            <img src='/assets/folders-info/3.png' alt='3.png' />
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
