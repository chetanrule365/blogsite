import { CloseRounded, Menu } from "@material-ui/icons";
import Head from "next/head";
import SideMenu from "../../components/SideMenu/SideMenu";
import { react_sidemenu_data } from "../../components/SideMenu/sideMenu_data";
import { useEffect } from "react";
import { closeMenu, openMenu } from "../../Animations/MenuToggle";
import Link from "next/link";
export default function index() {
    let ele: HTMLElement | null;
    let menubtnEle_open: HTMLElement | null;
    useEffect(() => {
        ele = document.getElementById("sidemenu");
        menubtnEle_open = document.getElementById("menubtn-open");
        setTimeout(() => {
            if (window.innerWidth <= 750) closeMenu(ele, menubtnEle_open);
        }, 700);
        window.addEventListener("resize", () => {
            if (window.innerWidth <= 750)
                if (ele) ele.style.width = `${window.innerWidth}px`;
        });
    });
    return (
        <>
            <Head>
                <title>React Tutorial</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <div id='react'>
                <div id='sidemenu'>
                    <div className='bg-dup'></div>
                    <header>
                        <Link href='/react'>
                            <p>React Tutorial</p>
                        </Link>
                        <div
                            id='menubtn'
                            onClick={() => {
                                closeMenu(ele, menubtnEle_open);
                            }}>
                            <CloseRounded className='btn' />
                        </div>
                    </header>
                    <SideMenu data={react_sidemenu_data} activeEle={null} />
                </div>
                <main>
                    <div
                        id='menubtn-open'
                        onClick={() => {
                            openMenu(
                                ele,
                                window.innerWidth <= 750,
                                menubtnEle_open,
                            );
                        }}>
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
                                Learn once, write anywhere. We can use React Js
                                over many popular frameworks like Ionic,
                                Next.js, Gastby.js and many more.
                            </li>
                        </ul>
                    </div>
                </main>
            </div>
        </>
    );
}
