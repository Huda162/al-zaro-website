import { useGSAP } from "@gsap/react"
import gsap from "gsap"

export default function useHomeAnimation(onComplete: any) {

    useGSAP(() => {
        gsap.to(".clipper-left", {
            duration: 2,
            delay: 2,
            clipPath: "inset(0 100% 0 0)",
            ease: 'power4.inOut'
        })
        gsap.to(".clipper-right", {
            duration: 2,
            delay: 2,
            clipPath: "inset(0 0 0 100%)",
            ease: 'power4.inOut'
        })
        gsap.from(".loader-wrapper", {
            duration: 2,
            scale: 0.9,
            ease: "power1.inOut"
        })
        gsap.from(".loader", {
            duration: 2.5,
            top: "100%",
            ease: "power1.inOut"
        })

        gsap.to(".laoder-wrapper, .pre-loader", {
            duration: .2,
            opacity: 0,
            ease: "power3.inOut",
            delay: 2.1,
            onComplete: () => {
                if (onComplete) onComplete()
            }

        })

        gsap.from(".sidebar-nav > * , .site-nav > *", {
            duration: 1,
            opacity: 0,
            delay: 3,
            y: -40,
            ease: "power1.inOut",
            stagger: {
                amount: 0.5
            }
        })
    })

}