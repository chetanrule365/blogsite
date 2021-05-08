import { CloseRounded, Menu } from "@material-ui/icons";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { closeMenu, openMenu } from "../../Animations/MenuToggle";
import CodeMaker from "../../components/CodeMaker/CodeMaker";
import SideMenu from "../../components/SideMenu/SideMenu";
import { react_sidemenu_data } from "../../components/SideMenu/sideMenu_data";

export default function create_react_app() {
    let ele: HTMLElement | null;
    let menubtnEle_open: HTMLElement | null;
    useEffect(() => {
        ele = document.getElementById("sidemenu");
        menubtnEle_open = document.getElementById("menubtn-open");
        openMenu(ele, window.innerWidth <= 750, menubtnEle_open);
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
                <title>Create-react-app</title>
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
                    <SideMenu data={react_sidemenu_data} activeEle={1} />
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
                        <h2>Create-react-app</h2>
                        <p>
                            Create React App is a comfortable environment for
                            learning React, and is the best way to start
                            building a new single-page application in React.
                        </p>
                        <p>
                            1. First, you need to install node.js on your
                            computer.
                        </p>
                        <a
                            href='https://nodejs.org/en/'
                            target='_blank'
                            rel='noopener noreferrer'>
                            Install Node.js
                        </a>
                        <p>
                            2. After installing node.js, the next step is to
                            create-react-app.
                        </p>
                        <p>To create react app, run:</p>
                        <CodeMaker
                            code={`//in terminal
npx create-react-app my_app
//Here my_app is the app name`}
                        />
                        <p>
                            If react app is successfully created you have to see
                            this.
                        </p>
                        <img
                            src='/assets/create-react-app/create-react-app.png'
                            alt='create-react-app'
                        />
                        <p>3. Then go to the created react app.</p>
                        <CodeMaker
                            code={`//in terminal
cd my_app`}
                        />
                        <p>4. Finally run the app. To run:</p>
                        <CodeMaker
                            code={`//in terminal
npm run start`}
                        />
                        <img
                            src='/assets/create-react-app/app-run.png'
                            alt='run'
                        />
                        <h2>Output:</h2>
                        <img
                            src='/assets/create-react-app/app-run-output.png'
                            alt='output'
                        />
                    </div>
                </main>
            </div>
        </>
    );
}
