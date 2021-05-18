import { CloseRounded, Menu } from "@material-ui/icons";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import CodeMaker from "../../../components/CodeMaker/CodeMaker";
import SideMenu from "../../../components/SideMenu/SideMenu";
import { react_sidemenu_data } from "../../../components/SideMenu/sideMenu_data";
import Header from "../../../components/Header/Header";
export default function jsx_in_react() {
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
                <title>Jsx-in-react</title>
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
                        <SideMenu data={react_sidemenu_data} activeEle={3} />
                    </div>
                    <main id='main-content'>
                        <div id='menubtn-open' onClick={() => toggleMenu()}>
                            <Menu className='btn' />
                        </div>
                        <div className='content'>
                            <h2>Introducing JSX</h2>
                            <p>Consider this variable declaration.</p>
                            <CodeMaker
                                code={`const element = <h1>Hello, world!</h1>;`}
                            />
                            <p>
                                This funny tag syntax is neither a string nor
                                HTML.
                            </p>
                            <p>
                                It is called JSX, and it is a syntax extension
                                to JavaScript. We recommend using it with React
                                to describe what the UI should look like. JSX
                                may remind you of a template language, but it
                                comes with the full power of JavaScript.
                            </p>
                            <h3>Lets look into 'App.js' in 'src' folder</h3>
                            <img src='/assets/jsx/2.png' alt='App.js' />
                            <h3>
                                Remove the default 'header' tag and code this.
                            </h3>
                            <CodeMaker
                                code={`// In App.js
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Hello world!</h1>
    </div>
  );
}

export default App;`}
                            />
                            <h3>
                                Now save code run app. To run, open Terminal in
                                vs-code by pressing 'cmd+`' and run cmd:
                            </h3>
                            <CodeMaker code={"npm run start"} />
                            <h2>Using JSX</h2>
                            <CodeMaker
                                code={`import React from "react";
//name object containing firstname, lastname
const name = {
    firstname: "chetan",
    lastname: "N",
};
//Here 'formatName()' is a function that returns 'p' tag with name concatenation
const formatName = (name) => {
    return <p>{name.firstname + " " + name.lastname}</p>;
};
function Component() {
    return (
        <div>
            {/*In JSX calling formatName function by passing 'name' object that returns 'p' tag */}
            {formatName(name)}
        </div>
    );
}

export default Component;`}
                            />
                            <h2>Output:</h2>
                            <img
                                src='/assets/jsx/jsx-output.png'
                                alt='jsx-output'
                            />
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
