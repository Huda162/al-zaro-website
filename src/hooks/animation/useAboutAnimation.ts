import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

export default function useAboutAnimation(i18n: any) {
    const isMobile = window.innerWidth < 768

    let t1 = gsap.timeline();

    t1.from(
        ".categories-title",
        {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power1.out',
            // delay: .2
        },
        1
    );
    t1.from(
        ".header-img",
        {
            xPercent: isMobile ? 0 : (i18n == 'ar' ? 30 : -30),
            yPercent: isMobile ? 100 : 0,
            opacity: 0,
            duration: 1.1,
            ease: "power1.out",
        },
        1.2
    );

    t1.from(
        ".heading",
        {
            xPercent: isMobile ? 0 : (i18n == 'ar' ? -30 : 30),
            yPercent: isMobile ? 100 : 0,
            opacity: 0,
            duration: 1.1,
            ease: "power1.out",
        },
        1.2
    );

    t1.from(
        ".sub-heading",
        {
            xPercent: isMobile ? 0 : (i18n == 'ar' ? -30 : 30),
            yPercent: isMobile ? 100 : 0,
            opacity: 0,
            duration: 1.1,
            ease: "power1.out",
        },
        1.2
    );


    t1.from(
        ".featured-card",
        {
            yPercent: 100,
            opacity: 0,
            duration: 1.1,
            ease: "power1.out",
        },
        1.5
    );

    t1.from(
        ".mission-section",
        {
            xPercent: i18n == 'ar' ? 100 : -100,
            opacity: 0,
            duration: 1.1,
            ease: "power1.out",
        },
        1.5
    );
    t1.from(
        ".about-count",
        {
            xPercent: i18n == 'ar' ? 100 : -100,
            opacity: 0,
            duration: 1.1,
            ease: "power1.out",
        },
        2
    );

}