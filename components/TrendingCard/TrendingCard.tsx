import { IconButton } from "@material-ui/core";
import {
    FavoriteBorderRounded,
    FavoriteRounded,
    MoreHorizRounded,
    Share,
} from "@material-ui/icons";
import Link from "next/link";
import { useState } from "react";
interface trendingCardProps {
    sno: String;
    title: String;
    timestamp: String;
    user: String;
    url: String;
}
export default function TrendingCard({
    sno,
    title,
    timestamp,
    user,
    url,
}: trendingCardProps) {
    const [isFav, setisFav] = useState(false);
    return (
        <div className='trending-card'>
            <div className='id'>{sno}</div>
            <div className='info'>
                <Link href={`${url}`}>
                    <div className='title'>{title}</div>
                </Link>
                <div className='bottom'>
                    <Link href={`${url}`}>
                        <div className='timestamp'>
                            {timestamp}. By {user}
                        </div>
                    </Link>
                    <div className='right'>
                        <IconButton
                            className='fav_btn'
                            style={{ padding: "8px" }}
                            onClick={() => setisFav(!isFav)}>
                            {isFav ? (
                                <FavoriteRounded
                                    style={{ width: "20px", height: "20px" }}
                                />
                            ) : (
                                <FavoriteBorderRounded
                                    style={{ width: "20px", height: "20px" }}
                                />
                            )}
                        </IconButton>
                        <IconButton>
                            <Share style={{ width: "20px", height: "20px" }} />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
