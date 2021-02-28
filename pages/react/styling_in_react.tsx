import { CloseRounded, Menu } from "@material-ui/icons";
import Head from "next/head";
import SideMenu from "../../components/SideMenu/SideMenu";
import { react_sidemenu_data } from "../../components/SideMenu/sideMenu_data";
import { useEffect } from "react";
import { closeMenu, openMenu } from "../../Animations/MenuToggle";
import Link from "next/link";
export default function styling_in_react() {
    let ele: HTMLElement | null;
    let menubtnEle_open: HTMLElement | null;
    useEffect(() => {
        ele = document.getElementById("sidemenu");
        menubtnEle_open = document.getElementById("menubtn-open");
        setTimeout(() => {
            if (window.innerWidth <= 750) closeMenu(ele, menubtnEle_open);
        }, 700);
    });
    return (
        <>
            <Head>
                <title>Styling in React.js</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <div id='react'>
                <div id='sidemenu'>
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
                    <SideMenu data={react_sidemenu_data} activeEle={4} />
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
                        <p>Styling in React.js</p>
                    </div>
                </main>
            </div>
        </>
    );
}
