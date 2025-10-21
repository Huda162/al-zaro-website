import { useGSAP } from "@gsap/react";
import StickyHeader from "../components/StickyHeader";
import { Link } from "react-router-dom";
import useGSAPAnimation from "../hooks/animation/useGSAPAnimation";
import useCategoriesAnimation from "../hooks/animation/useCategoriesAnimation";
import SectionTitle from "../components/SectionTitle";
import useFetchData from "../hooks/general/useFetchData";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";


export default function Categories() {
    useGSAP(() => {
        useGSAPAnimation()

        useCategoriesAnimation()
    })

    const { data } = useFetchData({ endpoint: 'categories', params: '' })
    let category = data?.categories
    const { t, i18n } = useTranslation()


    return (
        <div style={{ background: '#181414' }}>
            <StickyHeader />
            <div className="position-relative d-flex justify-content-center align-items-center flex-grow-1">
                <div className="w-100 clip clip-full h-0 overflow-hidden bg-no-repeat"></div>
            </div>
            <div className="container">
                <SectionTitle title={t("Categories")} subTitle={t("Browse Categories")} />
                <div className="row">
                    <div className="col-xl-8">
                        <div className="row">
                            <div className="col-lg-8 grid__item">
                                <div className="position-relative overflow-hidden mb-4">
                                    <div className="category-bg d-flex align-items-center justify-content-center position-relative p-1 category-bg-responsive-1"
                                        style={{
                                            backgroundImage: `url(${category?.[0]?.image})`,
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat'
                                        }}>
                                        <Link to={`/products/${category?.[0]?.id}`} className="category-link d-flex flex-column align-items-center justify-content-center w-[10rem] h-[4rem] rounded">
                                            <h1 className="font-size-1-1 m-0">
                                                {i18n.language == 'ar' ? category?.[0].name_ar : category?.[0].name_en}
                                            </h1>
                                            {/* <h4 className="cat-sub-title">{t("products")}({category?.[0]?.productsCounts})</h4> */}
                                            <span className="banner-link-text">{t("Browse")}</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 grid__item">
                                <div className="position-relative overflow-hidden mb-4">
                                    <div className="category-bg d-flex align-items-center justify-content-center position-relative p-1 category-bg-responsive-1"
                                        style={{
                                            backgroundImage: `url(${category?.[1]?.image})`,
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat'

                                        }}>
                                        <Link to={`/products/${category?.[1]?.id}`} className="category-link d-flex flex-column align-items-center justify-content-center w-[10rem] h-[4rem] rounded">
                                            <h1 className="font-size-1-1 m-0 m-0">
                                                {i18n.language == 'ar' ? category?.[1].name_ar : category?.[1].name_en}
                                            </h1>
                                            {/* <h4 className="cat-sub-title">{t("products")}({category?.[1]?.productsCounts})</h4> */}
                                            <span className="banner-link-text">{t("Browse")}</span>
                                        </Link>
                                    </div>
                                </div></div>
                            <div className="col-lg-4 grid__item">
                                <div className="position-relative overflow-hidden mb-4">
                                    <div className="category-bg d-flex align-items-center justify-content-center position-relative p-1 category-bg-responsive-2"
                                        style={{
                                            backgroundImage: `url(${category?.[2]?.image})`,
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat'
                                        }}>
                                        <Link to={`/products/${category?.[2]?.id}`} className="category-link d-flex flex-column align-items-center justify-content-center w-[10rem] h-[4rem] rounded">
                                            <h1 className="font-size-1-1 m-0">
                                                {i18n.language == 'ar' ? category?.[2].name_ar : category?.[2].name_en}
                                            </h1>
                                            {/* <h4 className="cat-sub-title">{t("products")}({category?.[2]?.productsCounts})</h4> */}
                                            <span className="banner-link-text">{t("Browse")}</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8 grid__item">
                                <div className="position-relative overflow-hidden mb-4">
                                    <div className="category-bg d-flex align-items-center justify-content-center position-relative p-1 category-bg-responsive-2"
                                        style={{
                                            backgroundImage: `url(${category?.[3]?.image})`,
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat'
                                        }}>
                                        <Link to={`/products/${category?.[3]?.id}`} className="category-link d-flex flex-column align-items-center justify-content-center w-[10rem] h-[4rem] rounded">
                                            <h1 className="font-size-1-1 m-0">
                                                {i18n.language == 'ar' ? category?.[3].name_ar : category?.[3].name_en}
                                            </h1>
                                            {/* <h4 className="cat-sub-title">{t("products")}({category?.[3]?.productsCounts})</h4> */}
                                            <span className="banner-link-text">{t("Browse")}</span>

                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-xl-4">
                        <div className="row">
                            <div className="col-xl-12 grid__item">
                                <div className="position-relative overflow-hidden mb-4">
                                    <div className="category-bg d-flex align-items-center justify-content-center position-relative p-1 category-bg-responsive-2"
                                        style={{
                                            backgroundImage: `url(${category?.[4]?.image})`,
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat'
                                        }}>
                                        <Link to={`/products/${category?.[4]?.id}`} className="category-link d-flex flex-column align-items-center justify-content-center w-[10rem] h-[4rem] rounded">
                                            <h1 className="font-size-1-1 m-0">
                                                {i18n.language == 'ar' ? category?.[4].name_ar : category?.[4].name_en}
                                            </h1>
                                            {/* <h4 className="cat-sub-title">{t("products")}({category?.[4]?.productsCounts})</h4> */}
                                            <span className="banner-link-text">{t("Browse")}</span>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                            <div className="col-xl-12 grid__item">
                                <div className="position-relative overflow-hidden mb-4">
                                    <div className="category-bg d-flex align-items-center justify-content-center position-relative p-1 category-bg-responsive-1"
                                        style={{
                                            backgroundImage: `url(${category?.[5]?.image})`,
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat'

                                        }}>
                                        <Link to={`/products/${category?.[5]?.id}`} className="category-link d-flex flex-column align-items-center justify-content-center w-[10rem] h-[4rem] rounded">
                                            <h1 className="font-size-1-1 m-0">
                                                {i18n.language == 'ar' ? category?.[5].name_ar : category?.[5].name_en}
                                            </h1>
                                            {/* <h4 className="cat-sub-title">{t("products")}({category?.[5]?.productsCounts})</h4> */}
                                            <span className="banner-link-text">{t("Browse")}</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="col-xl-4">
                                <div className="d-flex align-items-center justify-content-center"
                                    style={{
                                        backgroundImage: 'url(http://ecoheat.like-themes.com/wp-content/uploads/2024/06/type_04-500x500.jpg)',
                                        height: '300px',
                                        position: 'relative',
                                        padding: '5px',
                                        marginBottom: '1.5rem',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat'

                                    }}>
                                    <div className="category-link d-flex flex-column align-items-center justify-content-center w-[10rem] h-[4rem] rounded">
                                        <h1 style={{ fontSize: '1.1rem' }}>
                                            Fireplaces
                                        </h1>
                                        <h4 style={{ fontSize: '0.85rem', opacity: '90%' }}>sub title</h4>
                                        <span className="banner-link-text">Browse</span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-center"
                                    style={{
                                        backgroundImage: 'url(http://ecoheat.like-themes.com/wp-content/uploads/2024/06/blog_01.jpg)',
                                        height: '500px',
                                        position: 'relative',
                                        padding: '5px',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat'
                                    }}>
                                    <div className="category-link d-flex flex-column align-items-center justify-content-center w-[10rem] h-[4rem] rounded">
                                        <h1 style={{ fontSize: '1.1rem' }}>
                                            Fireplaces
                                        </h1>
                                        <h4 style={{ fontSize: '0.85rem', opacity: '90%' }}>sub title</h4>
                                        <span className="banner-link-text">Browse</span>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}