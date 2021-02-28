import { TweenMax, Power4 } from "gsap";
const closeMenu = (
    ele: HTMLElement | null,
    menubtnEle_open: HTMLElement | null,
) => {
    TweenMax.to(ele, 0.3, {
        opacity: 0,
        width: "0%",
        height: "0vh",
        display: "none",
        ease: Power4.easeInOut,
    });
    TweenMax.to(menubtnEle_open, 0.3, {
        opacity: 1,
        ease: Power4.easeInOut,
    });
};

const openMenu = (
    ele: HTMLElement | null,
    isMobile: Boolean,
    menubtnEle_open: HTMLElement | null,
) => {
    TweenMax.to(ele, 0.3, {
        opacity: 1,
        width: isMobile ? "100%" : "30%",
        height: "100%",
        display: "block",
        ease: Power4.easeInOut,
    });
    TweenMax.to(menubtnEle_open, 0.3, {
        opacity: 0,
        ease: Power4.easeInOut,
    });
};
export { closeMenu, openMenu };
