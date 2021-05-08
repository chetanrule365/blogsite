import Link from "next/link";
import { CloseRounded, Menu } from "@material-ui/icons";
import Head from "next/head";
import React, { useEffect } from "react";
import { closeMenu, openMenu } from "../../Animations/MenuToggle";
import SideMenu from "../../components/SideMenu/SideMenu";
import { react_sidemenu_data } from "../../components/SideMenu/sideMenu_data";
import CodeMaker from "../../components/CodeMaker/CodeMaker";

function functional_components() {
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
                    <SideMenu data={react_sidemenu_data} activeEle={5} />
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
                        <h3>Functional Components in ReactJs</h3>
                        <li>
                            JSX can be grouped together within individual
                            functions called components.
                        </li>
                        <li>
                            Functional Component names are capitalized to
                            distinguish them from plain JavaScript functions
                            that do not return JSX.
                        </li>
                        <CodeMaker
                            code={`function App() {
  return (
    <div className="App">
      <h1>Hello world!</h1>
      <h3>Welcome to ReactJs tutorial.</h3>
    </div>
  );
}

export default App;`}
                        />
                        <li>
                            The huge benefit of components is their ability to
                            be reused across our apps, wherever we need them.
                        </li>
                        <li>
                            Since components leverage the power of JavaScript
                            functions, we can logically pass data to them, like
                            we would by passing it one or more arguments.
                        </li>
                    </div>
                </main>
            </div>
        </>
    );
}

export default functional_components;
