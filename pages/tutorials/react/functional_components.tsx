import Link from "next/link";
import { CloseRounded, Menu } from "@material-ui/icons";
import Head from "next/head";
import React, { useEffect } from "react";
import SideMenu from "../../../components/SideMenu/SideMenu";
import { react_sidemenu_data } from "../../../components/SideMenu/sideMenu_data";
import CodeMaker from "../../../components/CodeMaker/CodeMaker";
import Header from "../../../components/Header/Header";
function functional_components() {
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
                        <SideMenu data={react_sidemenu_data} activeEle={5} />
                    </div>
                    <main id='main-content'>
                        <div id='menubtn-open' onClick={() => toggleMenu()}>
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
                                The huge benefit of components is their ability
                                to be reused across our apps, wherever we need
                                them.
                            </li>
                            <li>
                                Since components leverage the power of
                                JavaScript functions, we can logically pass data
                                to them, like we would by passing it one or more
                                arguments.
                            </li>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default functional_components;
