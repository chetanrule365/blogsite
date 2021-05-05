import { CloseRounded, Menu } from "@material-ui/icons";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect } from "react";
import { closeMenu, openMenu } from "../../Animations/MenuToggle";
import SideMenu from "../../components/SideMenu/SideMenu";
import { react_sidemenu_data } from "../../components/SideMenu/sideMenu_data";

function props() {
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
                <title>Functional components in React.js</title>
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
                    <SideMenu data={react_sidemenu_data} activeEle={6} />
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
                        <h3>Props in ReactJs</h3>
                        <li>
                            Data passed to components in JavaScript are called
                            props.
                        </li>
                        <li>
                            Props look identical to attributes on plain JSX/HTML
                            elements, but you can access their values within the
                            component itself.
                        </li>
                        <li>
                            Props are available in parameters of the component
                            to which they are passed. Props are always included
                            as properties of an object.
                        </li>
                    </div>
                </main>
            </div>
        </>
    );
}

export default props;
