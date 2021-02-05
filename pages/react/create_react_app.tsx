import { CloseRounded, Menu } from "@material-ui/icons";
import Head from "next/head";
import { useEffect, useState } from "react";
import { closeMenu, openMenu } from "../../components/Animations/MenuToggle";
import SideMenu from "../../components/SideMenu/SideMenu";
import { react_sidemenu_data } from "../../components/SideMenu/sideMenu_data";

export default function create_react_app() {
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
                <title>Create-react-app</title>
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
                    <SideMenu data={react_sidemenu_data} activeEle={1} />
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
                        <p>
                            Create React App is a comfortable environment for
                            learning React, and is the best way to start
                            building a new single-page application in React.To
                            create a project, run:
                        </p>
                        <p>
                            npx create-react-app my-app <br />
                            cd my-app <br />
                            npm start
                        </p>
                        <p>
                            Create React App is a comfortable environment for
                            learning React, and is the best way to start
                            building a new single-page application in React.To
                            create a project, run:
                        </p>
                        <p>
                            npx create-react-app my-app <br />
                            cd my-app <br />
                            npm start
                        </p>
                        <p>
                            Create React App is a comfortable environment for
                            learning React, and is the best way to start
                            building a new single-page application in React.To
                            create a project, run:
                        </p>
                        <p>
                            npx create-react-app my-app <br />
                            cd my-app <br />
                            npm start
                        </p>
                        <p>
                            Create React App is a comfortable environment for
                            learning React, and is the best way to start
                            building a new single-page application in React.To
                            create a project, run:
                        </p>
                        <p>
                            npx create-react-app my-app <br />
                            cd my-app <br />
                            npm start
                        </p>
                        <p>
                            Create React App is a comfortable environment for
                            learning React, and is the best way to start
                            building a new single-page application in React.To
                            create a project, run:
                        </p>
                        <p>
                            npx create-react-app my-app <br />
                            cd my-app <br />
                            npm start
                        </p>
                        <p>
                            Create React App is a comfortable environment for
                            learning React, and is the best way to start
                            building a new single-page application in React.To
                            create a project, run:
                        </p>
                        <p>
                            npx create-react-app my-app <br />
                            cd my-app <br />
                            npm start
                        </p>
                    </div>
                </main>
            </div>
        </>
    );
}
