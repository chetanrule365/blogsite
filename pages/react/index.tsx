import { CloseRounded, Menu } from "@material-ui/icons";
import Head from "next/head";
import SideMenu from "../../components/SideMenu/SideMenu";
import { react_sidemenu_data } from "../../components/SideMenu/sideMenu_data";
import { useEffect } from "react";
export default function index() {
    let ele: HTMLElement | null;
    let menubtnEle_open: HTMLElement | null;
    useEffect(() => {
        ele = document.getElementById("sidemenu");
        menubtnEle_open = document.getElementById("menubtn-open");
    }, []);
    return (
        <>
            <Head>
                <title>React Tutorial</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <div id='react'>
                <div id='sidemenu'>
                    <header>
                        <p>React Tutorial</p>
                        <div id='menubtn' onClick={() => {}}>
                            <CloseRounded className='btn' />
                        </div>
                    </header>
                    <SideMenu data={react_sidemenu_data} activeEle={null} />
                </div>
                <main>
                    <div id='menubtn-open' onClick={() => {}}>
                        <Menu className='btn' />
                    </div>
                    <div className='content'>
                        <p>Welcome to React tutorial</p>
                    </div>
                </main>
            </div>
        </>
    );
}
