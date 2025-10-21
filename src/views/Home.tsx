import { useRef } from "react";
import StickyHeader from "../components/StickyHeader";
import useHomeAnimation from "../hooks/animation/useHomeAmimation";

export default function Home() {
    const videoRef = useRef<HTMLVideoElement>(null)
    let isMobile = window.innerWidth < 768

    useHomeAnimation(() => {
        if (videoRef.current) {
            videoRef.current.play()
        }
    })

    return (
        <div>
            <div className="pre-loader block">
                <div className="loader-wrapper">
                    <div className="loader"></div>
                </div>
            </div>

            <div className="clipper-left" dir="ltr">
                <div className="loader-text"><img src="/assets/img/za.png" alt="" /></div>
            </div>
            <div className="clipper-right" dir="ltr">
                <div className="loader-text"><img src="/assets/img/ro.png" alt="" /></div>
            </div>

            <div className="site-nav">
                <StickyHeader />
                {/* <Socials /> */}
            </div>

            <div className="site-content">
                <div className="video-container" id="video-container">
                    <video loop muted ref={videoRef} playsInline>
                        <source
                            src={isMobile ? '/assets/videos/zaro-main-mobile-vedio.mp4' : '/assets/videos/zaro-main-video.mp4'}
                            type="video/mp4"
                        />
                    </video>
                </div>
            </div>

        </div>

    )
}