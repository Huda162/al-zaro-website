import '../../public/assets/css/about.scss';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';
import StickyHeader from './StickyHeader';
import useAboutAnimation from '../hooks/animation/useAboutAnimation';
import useGSAPAnimation from '../hooks/animation/useGSAPAnimation';
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../public/assets/animations/about-us.json";
import Footer from './Footer';

export default function About() {
    const { t, i18n } = useTranslation()
    useGSAP(() => {
        useGSAPAnimation()
        useAboutAnimation(i18n.language)
    })
    return (
        <div style={{ background: '#101213' }}>
            {/* <div className="cover-5">
                <div className="">
                    <div className="">
                        <img className="header-img" src="/assets/img/about-us.jpg" alt="" />
                    </div>

                    <div className="">
                        <h1 className="heading">
                            <h2 className="mb-30 text-white">Welcome to Zaro</h2>
                        </h1>
                        <p className="sub-heading">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate id est laborum.</p>
                    </div>
                </div>
            </div>
            <div className="cover">
                <div className="cover-heading">
                    <h1 className="imsrk"><img src='/assets/img/logo2.png' alt='zaro' /></h1>
                    <span className="dot">.</span>
                </div>
            </div> */}
            <div className="site-nav">
                <StickyHeader />
            </div>
            <div className="d-flex justify-content-center align-items-center flex-grow-1">
                <div className="w-100 clip clip-full h-0 overflow-hidden bg-no-repeat"></div>
            </div>
            <div className="" >
                <div className="container py-5">
                    <div className="mx-auto text-center mb-5 categories-title">
                        <h5 className="section-title px-3 text-white">{t("About us")}</h5>
                        <h1 className="mb-0 text-white">{t("MORE ABOUT ZARO")}</h1>
                    </div>
                    <section className="row align-items-center mb-50">
                        <div className="col-lg-6 mb-4">
                            <Lottie animationData={groovyWalkAnimation} loop={true} className='header-img' />

                            {/* <img src="/assets/img/about-us.jpg" alt="" className="border-radius-15 mb-md-3 mb-lg-0 mb-sm-4 w-100 header-img" /> */}
                        </div>
                        <div className="col-lg-6">
                            <div className="pl-25">
                                <h2 className="mb-3 text-white heading about-heading">{t("About Al-Zaru Commercial and Industrial Company")}</h2>
                                <p className="mb-25 sub-heading text-white">
                                    {t("Al-Zaru Commercial and Industrial Company was established in Palestine in 1980. It is a leading company in the design and production of high-quality wood stoves. With over 45 years of experience, we take pride in offering unique and innovative products that meet the needs of customers in homes and all sectors. Thanks to our long-standing and continuous reputation in the wood stove industry, we have gained the trust of many customers across the country. We are committed to providing exceptional customer service and ensuring their complete satisfaction with our products.")}
                                </p>

                            </div>
                        </div>
                    </section>
                    <div className="row mb-5">
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="featured-card text-center">
                                <img src="/assets/img/fire.png" alt="nest" />
                                <h4 className='text-white about-heading'>{t("Best Prices")}</h4>
                                <p >
                                    {t("Our products are distinguished by a variety of sizes and designs, allowing our customers to choose the option that best suits their needs and personal preferences. Whether you're looking for a compact wood stove that fits small spaces or a large wood stove to heat bigger areas, we provide the right solutions and possibilities for everyone.")}
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="featured-card text-center">
                                <img src="/assets/img/fire.png" alt="nest" />
                                <h4 className='text-white about-heading'>{t("High Efficiency")}</h4>
                                <p>
                                    {t("We focus on designing and developing wood stoves and gas fireplaces that combine high performance with aesthetic design. We ensure the delivery of products that operate with exceptional efficiency, providing warmth and comfort to users. This is made possible through advanced technology and high-quality materials used in our production processes.")}
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="featured-card text-center">
                                <img src="/assets/img/fire.png" alt="nest" />
                                <h4 className='text-white about-heading'>{t("Best Types")}</h4>
                                <p>
                                    {t("Our skilled teams of engineers and creative designers blend traditional craftsmanship with technological innovation. We prioritize maintaining the highest quality standards at every stage of production, ensuring the delivery of robust and reliable products that earn our customers' trust. Our offerings enhance the beauty and safety of their homes.")}
                                </p>
                            </div>
                        </div>

                    </div>

                    <section className="row align-items-center mb-50 mission-section">
                        <div className="row  align-items-center">
                            <div className="col-lg-7 pr-30">
                                <img src="/assets/img/about-5.png" alt="nest" className="mb-3" style={{ maxWidth: '100%' }} />
                            </div>
                            <div className="col-lg-5">
                                {/* <h4 className="mb-20 text-muted">الثقة</h4> */}
                                <h1 className="heading-1 mb-4  about-heading">{t("Credibility and trust")}</h1>
                                <p className="mb-30 text-white">
                                    {t("Credibility and trust are the two cornerstones of Al Zaro Industrial Trading Company. We are keen to build long-term relationships with our customers by providing high-quality products and exceptional customer service. We are committed to meeting our customers’ needs with honesty and transparency, which enhances their trust in our brand.")}
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 pr-30 mb-md-5 mb-lg-0 mb-sm-5">
                                <h3 className="mb-3 about-heading">{t("About us")}</h3>
                                <p className='text-white'>
                                    {t("Our skilled teams of creative engineers and designers combine traditional craftsmanship with technological innovation. We ensure the highest quality standards at every stage of production, ensuring we deliver robust and reliable products that are worthy of our customers’ trust.")}
                                </p>
                            </div>
                            <div className="col-lg-4 pr-30 mb-md-5 mb-lg-0 mb-sm-5">
                                <h3 className="mb-3 about-heading">{t("Our history")}</h3>
                                <p className='text-white'>
                                    {t("Al-Zaro Trading and Industrial Company was established in Palestine in 1980, and since then it has become a leader in the wood stove industry, as the company has grown to meet the needs of the market and provide innovative and distinctive solutions.")}
                                </p>
                            </div>
                            <div className="col-lg-4">
                                <h3 className="mb-3 about-heading">{t("Our mission")}</h3>
                                <p className='text-white'>
                                    {t("Our mission is to provide high quality and effective products, with a focus on innovation and aesthetic design. We strive to achieve customer satisfaction by providing the best solutions to meet their needs, while committing to credibility and trust in everything we offer.")}
                                </p>
                            </div>
                        </div>
                    </section>
                    <div className="row about-count mb-5">
                        <div className="col-6 col-md-3 text-center mb-lg-0 mb-md-5">
                            <h1 className="heading-1">
                                <span className="count">22</span>+</h1>
                            <h4>{t("Year")}</h4>
                        </div>
                        <div className="col-6 col-md-3 text-center mb-lg-0 mb-md-5">
                            <h1 className="heading-1">
                                <span className="count">100</span>+</h1>
                            <h4>{t("Customer")}</h4>
                        </div>
                        <div className="col-6 col-md-3 text-center mb-lg-0 mb-md-5">
                            <h1 className="heading-1">
                                <span className="count">40</span>+</h1>
                            <h4>{t("Fireplace")}</h4>
                        </div>
                        <div className="col-6 col-md-3 text-center mb-lg-0 mb-md-5">
                            <h1 className="heading-1">
                                <span className="count">12</span>+</h1>
                            <h4>{t("Product")}</h4>
                        </div>
                    </div>
                </div>
            </div >
            {/* <div className="cover">
                <div className="cover-heading">
                    <h1 className="imsrk"><img src='/assets/img/logo2.png' alt='zaro' /></h1>
                    <span className="dot">.</span>
                </div>
            </div> */}
            <Footer />
        </div>
    );
}
