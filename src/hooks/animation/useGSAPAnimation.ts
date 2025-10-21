import gsap from "gsap";
import getResponsiveStyles from "../../utils/getResponsiveStyles";

export default function useGSAPAnimation() {

    const { height, marginTop } = getResponsiveStyles()

    gsap.to(".clip", {
        backgroundSize: "100%",
        ease: "power4.inOut",
        duration: 1.2,
        delay: 0
    });

    gsap.to(".clip", {
        height: height,
        ease: "expo.inOut",
        duration: 1.2,
        delay: .2,
        marginTop: marginTop
    });

    gsap.to(".clip", {
        duration: 1.2,
        ease: "expo.inOut",
        clipPath: "polygon(0px 0%, 100% 0%, 100% 100%, 0px 100%)",
        delay: .5
    });

    gsap.from("footer", {
        duration: .5,
        opacity: 0,
        delay: 1,
        y: 40,
        ease: "power1.inOut",
        stagger: {
            amount: 0.5
        }
    })
    gsap.from(".navbar > *  ,.site-nav > *", {
        duration: .5,
        opacity: 0,
        delay: 1,
        y: -40,
        ease: "power1.inOut",
        stagger: {
            amount: 0.5
        }
    });

}