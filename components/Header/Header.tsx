import { Avatar, IconButton } from "@material-ui/core";

export default function Header() {
    return (
        <header className='main-header'>
            <IconButton>
                {/* <Avatar src='/vercel.svg' /> */}
                <img src='/vercel.svg' alt='logo' className='logo' />
            </IconButton>
            <p>
                <em>Good Morning!</em>, Chetan
            </p>
        </header>
    );
}
