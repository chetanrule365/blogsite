import { IconButton } from "@material-ui/core";
import { FavoriteBorderRounded, MoreHorizRounded } from "@material-ui/icons";
import Link from "next/link";
import moment from "moment";
export default function BlogCard({ blog }: any) {
    const { title, desc, timestamp, createdBy, thumbnail } = blog.data();
    return (
        <div className='blog-card' key={blog.id}>
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
                        <IconButton className='fav_btn'>
                            <FavoriteBorderRounded />
                        </IconButton>
                    </div>
                </div>
            </div>
            <Link href={`/blogs/${blog.id}`}>
                <div className='thumbnail'>
                    <img src={`${thumbnail}`} alt='thumbnail' />
                </div>
            </Link>
        </div>
    );
}
