import { CloseRounded, Menu } from "@material-ui/icons";
import Head from "next/head";
import SideMenu from "../../../components/SideMenu/SideMenu";
import { react_sidemenu_data } from "../../../components/SideMenu/sideMenu_data";
import { useEffect } from "react";
import Link from "next/link";
import CodeMaker from "../../../components/CodeMaker/CodeMaker";
import Header from "../../../components/Header/Header";
export default function styling_in_react() {
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
                <title>Styling in React.js</title>
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
                        <SideMenu data={react_sidemenu_data} activeEle={4} />
                    </div>
                    <main id='main-content'>
                        <div id='menubtn-open' onClick={() => toggleMenu()}>
                            <Menu className='btn' />
                        </div>
                        <div className='content'>
                            <h3>Styling in React.js</h3>

                            <li>
                                Inline styles can be added to JSX elements using
                                the style attribute.
                            </li>
                            <li>
                                Styles are updated within an object, not a set
                                of double quotes, as with HTML.
                            </li>
                            <li>
                                Note that style property names must be also
                                written in camelcase.
                            </li>

                            <CodeMaker
                                code={`<h1 style={{ color: "blue", fontSize: 22, padding: "0.5em 1em" }}>
    Hello React!
</h1>`}
                            />
                            <li>
                                Also like classic way we can add external .css
                                file to our component.
                            </li>
                            <CodeMaker
                                code={`import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Hello world!</h1>
    </div>
  );
}

export default App;`}
                            />
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
