import { Button, IconButton } from "@material-ui/core";
import {
    Delete,
    Edit,
    FavoriteBorderRounded,
    FavoriteRounded,
    MoreHorizRounded,
    Share,
} from "@material-ui/icons";
import Link from "next/link";
import moment from "moment";
import { useState } from "react";
import Popover from "@material-ui/core/Popover";
export default function BlogCard({
    blog,
    isFav,
    isOwner,
}: {
    blog: any;
    isFav?: boolean;
    isOwner?: boolean;
}) {
    const { title, desc, timestamp, createdBy, thumbnail } = blog.data();
    const [isFavourite, setIsFavourite] = useState(isFav ? isFav : false);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    return (
        <>
            <div className='blog-card' key={blog.id}>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    className='popover'
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}>
                    <div className='pop-content'>
                        <Button className='share'>
                            <Share />
                            <p>Share</p>
                        </Button>
                        <Button className='delete'>
                            <Delete />
                            <p>Delete</p>
                        </Button>
                    </div>
                </Popover>
                <div className='info'>
                    <Link href={`/blogs/${blog.id}`}>
                        <div className='details'>
                            <div className='title'>{title}</div>
                            <div className='desc'>{desc}</div>
                        </div>
                    </Link>
                    <div className='bottom'>
                        <div className='timestamp'>
                            {moment(timestamp).format("ll")}. By {createdBy}
                        </div>
                        <div className='right'>
                            {isOwner ? (
                                <IconButton className='edit-btn'>
                                    <Edit />
                                </IconButton>
                            ) : (
                                <IconButton
                                    className='fav_btn'
                                    onClick={async () => {
                                        setIsFavourite(!isFavourite);
                                    }}>
                                    {isFavourite ? (
                                        <FavoriteRounded />
                                    ) : (
                                        <FavoriteBorderRounded />
                                    )}
                                </IconButton>
                            )}
                            {isOwner ? (
                                <IconButton onClick={handleClick}>
                                    <MoreHorizRounded />
                                </IconButton>
                            ) : (
                                <IconButton className='share-btn'>
                                    <Share />
                                </IconButton>
                            )}
                        </div>
                    </div>
                </div>
                <Link href={`/blogs/${blog.id}`}>
                    <div className='thumbnail'>
                        <img src={`${thumbnail}`} alt='thumbnail' />
                    </div>
                </Link>
            </div>
        </>
    );
}
