import { CloseRounded, Menu } from "@material-ui/icons";
import Head from "next/head";
import { useEffect, useState } from "react";
import { closeMenu, openMenu } from "../../components/Animations/MenuToggle";
import SideMenu from "../../components/SideMenu/SideMenu";
import { react_sidemenu_data } from "../../components/SideMenu/sideMenu_data";

export default function stripping_the_folders() {
    let ele: HTMLElement | null;
    let menubtnEle_open: HTMLElement | null;
    let isMobile: Boolean;
    const [toggle, setToggle] = useState(false);
    useEffect(() => {
        ele = document.getElementById("sidemenu");
        menubtnEle_open = document.getElementById("menubtn-open");
        isMobile = window.innerWidth <= 750;
        console.log("assigned" + toggle);
    }, [toggle]);
    useEffect(() => {
        setTimeout(() => {
            if (isMobile) closeMenu(ele, menubtnEle_open);
        }, 700);
        console.log("initial close");
    }, []);
    return (
        <>
            <Head>
                <title>Stripping the folders</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <div id='react'>
                <div id='sidemenu'>
                    <header>
                        <p>React Tutorial</p>
                        <div
                            id='menubtn'
                            onClick={() => {
                                setToggle(!toggle);
                                closeMenu(ele, menubtnEle_open);
                            }}>
                            <CloseRounded className='btn' />
                        </div>
                    </header>
                    <SideMenu data={react_sidemenu_data} activeEle={2} />
                </div>
                <main>
                    <div
                        id='menubtn-open'
                        onClick={() => {
                            setToggle(!toggle);
                            openMenu(ele, isMobile, menubtnEle_open);
                        }}>
                        <Menu className='btn' />
                    </div>
                    <div className='content'>
                        <p>Stripping the folders</p>
                    </div>
                </main>
            </div>
        </>
    );
}
