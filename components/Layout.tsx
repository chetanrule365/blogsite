import Head from "next/head";
import Header from "./Header/Header";

function Layout({ children }: any) {
    return (
        <div className='layout'>
            <Head>
                <meta name='color-scheme' content='dark light' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Header />
            {children}
        </div>
    );
}

export default Layout;
