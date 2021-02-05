import { Avatar, IconButton } from "@material-ui/core";

export default function Header() {
    return (
        <header className="main-header">
            <IconButton>
                <Avatar />
            </IconButton>
            <p>Hello, user!</p>
        </header>
    );
}
