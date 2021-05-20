import { IconButton } from "@material-ui/core";
import {
    FavoriteBorderRounded,
    FavoriteRounded,
    MoreHorizRounded,
    Share,
} from "@material-ui/icons";
import Link from "next/link";
import { useState } from "react";
import moment from "moment";
export default function TrendingCard({
    sno,
    blog,
    manualData,
}: {
    sno?: string;
    blog?: any;
    manualData?: {
        sno: string;
        title: string;
        timestamp: string;
        createdBy: string;
        url: string;
    };
}) {
    const { title, desc, timestamp, createdBy, thumbnail, url } = blog
        ? blog.data()
        : manualData;
    const [isFav, setisFav] = useState(false);
    return (
        <div className='trending-card'>
            <div className='id'>{sno ? sno : manualData?.sno}</div>
            <div className='info'>
                <Link href={blog ? `/blogs/${blog.id}` : url}>
                    <div className='title'>{title}</div>
                </Link>
                <div className='bottom'>
                    <Link href={blog ? `/blogs/${blog.id}` : url}>
                        <div className='timestamp'>
                            {blog ? moment(timestamp).format("ll") : timestamp}.
                            By {createdBy}
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
