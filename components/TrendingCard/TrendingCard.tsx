import { IconButton } from "@material-ui/core";
import { FavoriteBorderRounded, MoreHorizRounded } from "@material-ui/icons";
import Link from "next/link";
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
                            style={{ padding: "8px" }}>
                            <FavoriteBorderRounded
                                style={{ width: "20px", height: "20px" }}
                            />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
