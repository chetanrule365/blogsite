import Link from "next/link";
import { useEffect } from "react";
interface sidemenuProps {
    data: Array<{ text: String; link: String }>;
    activeEle: Number | null;
}
export default function SideMenu({ data, activeEle }: sidemenuProps) {
    useEffect(() => {
        const animate = (i: any) => {
            const ele = document.getElementById(`menuitem${i}`);
            const ele1 = document.getElementById(`menuitem${i - 1}`);
            const ele2 = document.getElementById(`menuitem${i + 1}`);
            if (ele) ele.classList.add("active");
            if (ele1) ele1.style.borderBottomRightRadius = "30px";
            if (ele2) ele2.style.borderTopRightRadius = "30px";
        };
        if (activeEle) animate(activeEle);
    }, []);

    return (
        <menu id='menu'>
            <ul>
                <li className='dup' id={`menuitem0`} key={`menuitem0`}></li>
                {data.map((item, i: any) => {
                    return (
                        <Link href={"/" + item.link} key={`menuitem${i + 1}`}>
                            <li
                                id={`menuitem${i + 1}`}>
                                {item.text}
                            </li>
                        </Link>
                    );
                })}
                <li
                    className='dup'
                    id={`menuitem${data.length + 1}`}
                    key={`menuitem${data.length + 1}`}></li>
            </ul>
        </menu>
    );
}
