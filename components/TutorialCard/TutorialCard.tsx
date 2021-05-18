import { IconButton } from "@material-ui/core";
import {
    FavoriteBorderRounded,
    FavoriteRounded,
    MoreHorizRounded,
    Share,
} from "@material-ui/icons";
import Link from "next/link";
import moment from "moment";
import { useState } from "react";
interface tutorialCardProps {
    title: String;
    desc: String;
    timestamp: any;
    user: String;
    thumbnail: String;
    url: string;
}
export default function TutorialCard({
    title,
    desc,
    timestamp,
    user,
    thumbnail,
    url,
}: tutorialCardProps) {
    const [isFav, setisFav] = useState(false);
    return (
        <div className='blog-card'>
            <div className='info'>
                <Link href={`${url}`}>
                    <div className='details'>
                        <div className='title'>{title}</div>
                        <div className='desc'>{desc}</div>
                    </div>
                </Link>
                <div className='bottom'>
                    <div className='timestamp'>
                        {moment(timestamp).format("ll")}. By {user}
                    </div>
                    <div className='right'>
                        <IconButton
                            className='fav_btn'
                            onClick={() => setisFav(!isFav)}>
                            {isFav ? (
                                <FavoriteRounded />
                            ) : (
                                <FavoriteBorderRounded />
                            )}
                        </IconButton>
                        <IconButton>
                            <Share />
                        </IconButton>
                    </div>
                </div>
            </div>
            <Link href={`${url}`}>
                <div className='thumbnail'>
                    <img src={`${thumbnail}`} alt='thumbnail' />
                </div>
            </Link>
        </div>
    );
}
