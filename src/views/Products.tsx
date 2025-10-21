import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import StickyHeader from "../components/StickyHeader";
import useFilterProducts from "../hooks/products/useFilterProducts";
import { Link, useParams } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import useGSAPAnimation from "../hooks/animation/useGSAPAnimation";
import useFetchData from "../hooks/general/useFetchData";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";

export default function Products() {

    const param = useParams()
    const {
        handleSortChange,
        filterProduct,
        handleNameChange,
        filteredProducts,
        filters,
    } = useFilterProducts(param)

    const { data } = useFetchData({ endpoint: 'categories', params: '' })
    const { i18n, t } = useTranslation()

    useEffect(() => {
        filterProduct()
    }, [filters])

    const [name, setName] = useState('')

    useGSAP(() => {
        useGSAPAnimation()
    })

    let category = data?.categories?.find((item) => item.id == Number(param.id))

    return (
        <div>
            <div style={{ background: '#181414' }}>
                <StickyHeader />
            </div>
            <div className="position-relative d-flex justify-content-center align-items-center flex-grow-1">
                <div className="w-100 clip clip-full h-0 overflow-hidden bg-no-repeat"></div>
            </div>
            <div className="container">
                <div className="row mb-4">
                    <div className="d-block d-md-none">
                        <Breadcrumb parent={t("Home")} child={t("Categories")} subChild={`${i18n.language == 'ar' ? category?.name_ar : category?.name_en}`} childLink={"/categories"} />
                    </div>
                    <div className="col-md-3 mt-5 d-none d-xl-block d-xxl-block">
                        <div className="card" style={{ background: '#f6f1ea', border: 0 }}>
                            <div className="row d-flex justify-content-center align-items-center mb-4">
                                <div style={{ padding: '20px 50px 0px 50px' }}>
                                    <div className="form" dir="ltr">
                                        <input style={{ borderRadius: '50px', border: 0 }} type="text" className="form-control form-input p-3" placeholder={t("Search product...")} value={name} onChange={(e) => setName(e.target.value)} />
                                        <span className="left-pan" role="button" onClick={() => handleNameChange(name)}><i className="bi bi-search"></i></span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: '10px' }}>
                                <h4 className="mb-3 px-2">
                                    <span>
                                        <i className="bi bi-fire" style={{ color: '#629f12' }}></i>
                                    </span>
                                    {t("Categories")}
                                </h4>
                                <ul className="product-categories">
                                    {data?.categories?.map((item: any, index: number) => (
                                        <li className="cat-item d-flex align-items-center" key={index}>
                                            <span>
                                                <i className={`bi bi-arrow-${i18n.language == 'ar' ? "left" : "right"}-short`}></i>
                                            </span>
                                            <Link to={`/products/${item?.id}`} > {i18n.language == 'ar' ? item?.name_ar : item?.name_en}&nbsp;</Link>
                                            <span>({item?.productsCounts})</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-xl-8 col-xxl-8 mt-5">
                        <div className="mb-3 d-flex justify-content-between align-items-center">
                            <p className="mb-0 text-black">{t("Showing all")} {filteredProducts?.data?.length} {t("results")}</p>
                            <form className="filter" dir="ltr">
                                <div className="dropdown">
                                    <select className="dropdown-select" onChange={(e) => handleSortChange(e.target.value)}>
                                        <option value="" selected >{t("Default sorting")}</option>
                                        <option value="most_ordered">{t("Sort by popularity")}</option>
                                        <option value="latest">{t("Sort by latest")}</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="row mb-5">
                            {filteredProducts?.data?.map((product: any) => (
                                <div className="col-md-4 mb-2">
                                    <ProductCard
                                        id={product?.id}
                                        name={i18n.language == "ar" ? product.name_ar : product.name_en}
                                        image={product?.images?.[0]?.url}
                                        imageHover={product?.images?.[1]?.url}
                                        description={i18n.language == 'ar' ? product?.description_ar?.slice(0, 20) : product?.description_en?.slice(0, 20)}
                                        available={product?.available}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* <div className="container">
                <section className="reveal">
                    <div className="reveal__wrapp">

                        <div className="reveal_img">

                            <div className="reveal_img-item">
                                <span className="reveal_img-num">100</span>
                                <div className="reveal_img-inner">
                                    <div className="reveal_img-bl">
                                        <img src="http://ecoheat.like-themes.com/wp-content/uploads/2024/06/shop_01-600x606.jpg" alt="" className="reveal_img-img" />
                                    </div>
                                </div>
                            </div>

                            <div className="reveal_img-item">
                                <span className="reveal_img-num">100</span>
                                <div className="reveal_img-inner">
                                    <div className="reveal_img-bl">
                                        <img src="http://ecoheat.like-themes.com/wp-content/uploads/2024/06/shop_01-600x606.jpg" alt="" className="reveal_img-img" />
                                    </div>
                                </div>
                            </div>

                            <div className="reveal_img-item">
                                <span className="reveal_img-num">100</span>
                                <div className="reveal_img-inner">
                                    <div className="reveal_img-bl">
                                        <img src="http://ecoheat.like-themes.com/wp-content/uploads/2024/06/shop_01-600x606.jpg" alt="" className="reveal_img-img" />
                                    </div>
                                </div>
                            </div>

                            <div className="reveal_img-item">
                                <span className="reveal_img-num">100</span>
                                <div className="reveal_img-inner">
                                    <div className="reveal_img-bl">
                                        <img src="http://ecoheat.like-themes.com/wp-content/uploads/2024/06/shop_01-600x606.jpg" alt="" className="reveal_img-img" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div > */}
            <Footer />
        </div>

    )
}