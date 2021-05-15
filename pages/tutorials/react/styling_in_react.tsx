import { CloseRounded, Menu } from "@material-ui/icons";
import Head from "next/head";
import SideMenu from "../../../components/SideMenu/SideMenu";
import { react_sidemenu_data } from "../../../components/SideMenu/sideMenu_data";
import { useEffect } from "react";
import { closeMenu, openMenu } from "../../../Animations/MenuToggle";
import Link from "next/link";
import CodeMaker from "../../../components/CodeMaker/CodeMaker";
import Header from "../../../components/Header/Header";
export default function styling_in_react() {
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
                <title>Styling in React.js</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Header switchURL='' />
            <div id='react'>
                <div id='sidemenu'>
                    <header>
                        <Link href='/tutorials/react'>
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
                        <h3>Styling in React.js</h3>

                        <li>
                            Inline styles can be added to JSX elements using the
                            style attribute.
                        </li>
                        <li>
                            Styles are updated within an object, not a set of
                            double quotes, as with HTML.
                        </li>
                        <li>
                            Note that style property names must be also written
                            in camelcase.
                        </li>

                        <CodeMaker
                            code={`<h1 style={{ color: "blue", fontSize: 22, padding: "0.5em 1em" }}>
    Hello React!
</h1>`}
                        />
                        <li>
                            Also like classic way we can add external .css file
                            to our component.
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
        </>
    );
}
