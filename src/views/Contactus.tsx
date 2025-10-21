import { useGSAP } from "@gsap/react";
import StickyHeader from "../components/StickyHeader";
import gsap from "gsap";
import { useTranslation } from "react-i18next";
import useGSAPAnimation from "../hooks/animation/useGSAPAnimation";
import Footer from "../components/Footer";
import {
    useLoadScript,
    GoogleMap,
    MarkerF,
} from "@react-google-maps/api";
import { useState } from "react";
export default function ContactUs() {
    const { t, i18n } = useTranslation()
    const isMobile = window.innerWidth < 768
    const [markersPosition, setMarkersPosition] = useState([
        { lng: 35.10251600, lat: 31.57827700 },
        { lng: 35.09982700, lat: 31.53256800 },
        { lng: 35.26097300, lat: 32.22503900 },
        { lng: 35.2038888889, lat: 31.7047222222 },


    ]);
    const { isLoaded } = useLoadScript({
        // @ts-ignore
        googleMapsApiKey: "AIzaSyAn2K1tS0JOm1D13Dn1sAtKMpgF0yaCqf0" || "",
    });

    useGSAP(() => {
        useGSAPAnimation()

        let tl = gsap.timeline()
        tl.from(
            ".categories-title",
            {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'sine.out',
                stagger: 0.1,
                delay: 1.3
            },

        );
        tl.from(".contact-info", {
            x: isMobile ? 0 : (i18n.language == 'ar' ? 100 : -100),
            y: isMobile ? 100 : 0,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
        }, 1);

        tl.from(".contact-form", {
            x: isMobile ? 0 : (i18n.language == 'ar' ? -100 : 100),
            y: isMobile ? 100 : 0,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
        }, 1);

        tl.from(".contact-map", {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            delay: 1,
        }, 1.5);
    });
    return (
        <div style={{ background: '#101213' }}>
            <StickyHeader />
            <div className="position-relative d-flex justify-content-center align-items-center flex-grow-1">
                <div className="w-100 clip clip-full h-0 overflow-hidden bg-no-repeat"></div>
            </div>
            <main className="contact">
                <div className="">
                    <div className="container-fluid py-5">
                        <div className="container py-3">
                            <div className="mx-auto text-center mb-5 categories-title">
                                <h5 className="section-title px-3 text-white">{t("Contact us")}</h5>
                                <h1 className="mb-0 text-white">{t("Have Questions? We're Here")}!</h1>
                            </div>
                            <div className="row g-5 align-items-center justify-content-center">
                                <div className="col-lg-3 contact-info">
                                    <div className="rounded p-4">
                                        <div className="text-center mb-4 shadow-sm p-4 bg-white text-dark rounded">
                                            <i className="bi bi-geo-alt-fill fa-3x text-dark"></i>
                                            <h5 className="text-dark"><strong>{t("Hebron")}</strong></h5>
                                            <span className="mb-0">{t("Municipal Housing Suburb")}
                                                {t("Qalqas Roundabout Road")} <br /> <strong>
                                                </strong></span>
                                        </div>
                                        <div className="text-center mb-4 shadow-sm p-4 bg-white text-dark rounded">
                                            <i className="bi bi-geo-alt-fill fa-3x text-dark"></i>
                                            <h5 className="text-dark"><strong>{t("Halhul")}</strong></h5>
                                            <span className="mb-0">{t("directly opposite the Hisbah Gate")}
                                            </span>
                                        </div>
                                        <div className="text-center mb-4 shadow-sm p-4 bg-white text-dark rounded">
                                            <i className="bi bi-geo-alt-fill fa-3x text-dark"></i>
                                            <h5 className="text-dark"><strong>{t("Bethlehem")}</strong></h5>
                                            <span className="mb-0">{t("Beit Jala")} - {t("behind Al-Hussein Hospital")}
                                            </span>
                                        </div>
                                        <div className="text-center mb-4 shadow-sm p-4 bg-white text-dark rounded">
                                            <i className="bi bi-geo-alt-fill fa-3x text-dark"></i>
                                            <h5 className="text-dark"><strong>{t("Nablus")}</strong></h5>
                                            <span className="mb-0">{t("Beit Iba")} - {t("Qusin Road")} - {t("next to the northern dynamometer")}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7 contact-form">
                                    <div className="contact-title">
                                        <h3 className="mb-2 text-white">{t("Send us a message")}</h3>
                                        {/* <p className="mb-4 text-white">The contact form is currently inactive.
                                            Get a functional and working contact form with Ajax & PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <a href="https://htmlcodex.com/contact-form">Download Now</a>.</p> */}
                                    </div>

                                    <form>
                                        <div className="row g-3 mb-4">
                                            <div className="col-md-6">
                                                <div className="form-floating">
                                                    <input type="text" className="form-control" id="name" placeholder={t("Your Name")} />
                                                    <label htmlFor="name" style={{ right: i18n.language == 'ar' ? 0 : '', left: i18n.language == 'ar' ? '' : 0 }}>{t("Your Name")}</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating">
                                                    <input type="email" className="form-control" id="email" placeholder={t("Your Email")} />
                                                    <label htmlFor="email" style={{ right: i18n.language == 'ar' ? 0 : '', left: i18n.language == 'ar' ? '' : 0 }}>{t("Your Email")}</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating">
                                                    <input type="text" className="form-control" id="subject" placeholder={t("Subject")} />
                                                    <label htmlFor="subject" style={{ right: i18n.language == 'ar' ? 0 : '', left: i18n.language == 'ar' ? '' : 0 }}>{t("Subject")}</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating">
                                                    <textarea className="form-control" placeholder={t("Leave a message here")} id="message" style={{ height: "160px" }}></textarea>
                                                    <label htmlFor="message" style={{ right: i18n.language == 'ar' ? 0 : '', left: i18n.language == 'ar' ? '' : 0 }}>{t("Message")}</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating">
                                                    <button className="btn btn-primary w-100 py-3" type="submit">{t("Send Message")}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="row gap-2 flex-md-nowrap">
                                        <div className="text-center shadow-sm p-4  bg-white text-dark rounded col-md-4">
                                            <i className="bi bi-whatsapp text-dark mb-3 fa-3x"></i>
                                            <h4 className="text-dark">
                                                <strong>{t("Mobile")}</strong></h4>
                                            <span className="mb-0" dir="ltr">
                                                <a href="https://api.whatsapp.com/send?phone=972566229171" style={{ color: '#288b5e' }}>
                                                    +972 0566229171
                                                </a>
                                            </span>
                                        </div>
                                        <div className="text-center shadow-sm p-4  bg-white text-dark rounded col-md-4">
                                            <i className="bi bi-whatsapp text-dark mb-3 fa-3x"></i>
                                            <h4 className="text-dark">
                                                <strong>{t("Mobile")}</strong></h4>
                                            <span className="mb-0" dir="ltr">
                                                <a href="https://api.whatsapp.com/send?phone=972599222171" style={{ color: '#288b5e' }}>
                                                    +972 0599222171
                                                </a>
                                            </span>
                                        </div>
                                        <div className="text-center shadow-sm p-4  bg-white text-dark rounded col-md-4">
                                            <i className="bi bi-envelope-open fa-3x text-dark mb-3"></i>
                                            <h4 className="text-dark"><strong>{t("Email")}</strong></h4>
                                            <span className="mb-0">info@zaro.ps</span>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-md-10 contact-map">
                                    {/* <iframe src="https://www.google.com/maps/d/embed?mid=1U2fRji8w868Mu5yHg7cLIyA0mTxOCy8&ehbc=2E312F" width="100%" height="480"></iframe> */}

                                    <div className="rounded">
                                        {isLoaded && (
                                            <div
                                                style={{
                                                    height: "400px",
                                                    marginTop: "10px",
                                                }}
                                            >
                                                <GoogleMap
                                                    center={{ lat: markersPosition[0].lat, lng: markersPosition[0].lng }}
                                                    mapContainerStyle={{ height: "400px", width: "100%" }}
                                                    zoom={8}

                                                >
                                                    {markersPosition.map((marker, index) => (
                                                        <MarkerF key={index} position={{ lat: marker.lat, lng: marker.lng }} />
                                                    ))}
                                                </GoogleMap>
                                            </div>
                                        )}
                                        {/* <iframe className="rounded w-100"
                                            style={{ height: '450px' }}
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d103157.06468237037!2d35.09172799999999!3d31.529637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151257c8f9f03d75%3A0x9a3d55a6db6d4a4b!2sHebron%2C%20Palestine!5e0!3m2!1sen!2sbd!4v1694259649153!5m2!1sen!2sbd"
                                            loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main >

            {/* <div className="cover">
                <div className="cover-heading">
                    <h1 className="imsrk"><img src='/assets/img/logo2.png' alt='zaro' /></h1>
                    <span className="dot">.</span>
                </div>
            </div> */}
            < Footer />
        </div >
    );
}
