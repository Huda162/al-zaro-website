import { useGSAP } from "@gsap/react";
import StickyHeader from "../components/StickyHeader";
import useGSAPAnimation from "../hooks/animation/useGSAPAnimation";
import { useEffect, useRef, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import Slider from "react-slick";
import InnerImageZoom from "react-inner-image-zoom";
import useFetchData from "../hooks/general/useFetchData";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { Image, ProductColor } from "../interfaces/product";

export default function ProductDetails() {
  const param = useParams();
  const { data } = useFetchData({
    endpoint: `products/${param.id}`,
    params: "",
  });
  
  const product = data?.product;
  const relatedProducts = data?.related_product;
  
  const [currentImage, setCurrentImage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const sliderRef = useRef<Slider>(null);

  useGSAP(() => {
    useGSAPAnimation();
  });

  const handleThumbnailClick = (imageSrc: string, index: number) => {
    setCurrentImage(imageSrc);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  const handleColorClick = (color: ProductColor) => {
    if (color.color_image) {
      setCurrentImage(color.color_image);
      setSelectedColor(color);
    }
  };

  const { t, i18n } = useTranslation();
  const categoryName = i18n.language == "ar"
    ? product?.category_name.name_ar
    : product?.category_name.name_en;
  const productName = i18n.language == "ar" ? product?.name_ar : product?.name_en;

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinite: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 554,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const settingsThumbnail = {
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    // @ts-ignore
    infinite: product?.images?.length > 4 ? true : false,
    dots: false,
    // @ts-ignore
    centerMode: product?.images?.length > 4 ? true : false,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          // @ts-ignore
          slidesToShow: product?.images?.length > 4 ? 3 : 4,
        },
      },
      {
        breakpoint: 554,
        settings: {
          // @ts-ignore
          slidesToShow: product?.images?.length > 4 ? 3 : 4,
        },
      },
    ],
  };

  const productSpecifications = [
    { label: "Stove Power", value: product?.stove_power, unit: "Kw/h" },
    { label: "Weight", value: product?.weight, unit: "Kg" },
    { label: "Dimension", value: product?.dimension, unit: "Cm" },
    { label: "Glass", value: product?.glass, unit: "" },
    {
      label: "Heating Area",
      value: product?.heating_area,
      unit: "m<sup>2</sup>",
    },
    { label: "Door Opening", value: product?.door_opening, unit: "" },
  ];

  useEffect(() => {
    const numSlides = product?.images?.length;
    const sliderNav = document.querySelector(".slider-nav");

    if (numSlides === 1 || numSlides === 2 || numSlides === 3) {
      sliderNav?.classList.add("small-slides");
    } else {
      sliderNav?.classList.remove("small-slides");
    }
  }, [product]);

  useEffect(() => {
    if (product?.images?.[0]?.url) {
      setCurrentImage(product.images[0].url);
    }
    if (product?.product_colors?.[0]) {
      setSelectedColor(product.product_colors[0]);
    }
  }, [product]);

  return (
    <>
      <StickyHeader />
      <div className="position-relative d-flex justify-content-center align-items-center flex-grow-1">
        <div className="w-100 clip clip-full h-0 overflow-hidden bg-no-repeat"></div>
      </div>
      <section className="py-5">
        <div className="container">
          <Breadcrumb
            parent={t("Home")}
            child={`${categoryName}`}
            subChild={`${productName}`}
            childLink={`/products/${product?.category_id}`}
          />
          <div className="row">
            <aside className="col-xl-5 col-xxl-5 col-md-6">
              <div className="border rounded-4">
<div className="border rounded-4">
  {selectedColor && currentImage === selectedColor.color_image ? (
    // Show single color image when a color is selected
    <InnerImageZoom
      className="rounded-4"
      src={selectedColor.color_image}
      zoomSrc={selectedColor.color_image}
      fullscreenOnMobile
      width={550}
      height={500}
      moveType="drag"
    />
  ) : (
    // Show product image slider when no color is selected
    <Slider
      className="product-slick"
      {...settingsMain}
      ref={sliderRef}
    >
      {product?.images?.map((image: Image, index: number) => (
        <InnerImageZoom
          key={index}
          className="rounded-4"
          src={image.url}
          zoomSrc={image.url}
          fullscreenOnMobile
          width={550}
          height={500}
          moveType="drag"
        />
      ))}
    </Slider>
  )}
</div>
              </div>
              <div className="mb-3 mt-1">
                <Slider {...settingsThumbnail} className="slider-nav">
                  {product?.images?.map((image: Image, index: number) => (
                    <img
                      key={index}
                      className={`rounded-2 border-img ${
                        currentImage !== image.url ? "opacity-75" : ""
                      }`}
                      src={image.url}
                      onClick={() => handleThumbnailClick(image.url, index)}
                      alt={`Product thumbnail ${index + 1}`}
                    />
                  ))}
                </Slider>
              </div>
            </aside>

            <main className="col-xl-7 col-xxl-7 col-md-6">
              <div className="ps-lg-3">
                <p className="text-muted">{categoryName}</p>
                <h4 className="title text-dark mb-4 product-title">
                  {productName}
                </h4>
                
                {/* Product Colors Section */}
                {product?.product_colors && product.product_colors.length > 0 && (
                  <div className="mb-4">
                    <h5 className="mb-2">{t("Colors")}</h5>
                    <div className="d-flex gap-2 flex-wrap">
                      {product.product_colors.map((colorItem: ProductColor) => (
                        <div
                          key={colorItem.id}
                          onClick={() => handleColorClick(colorItem)}
                          className={`border rounded p-1 ${
                            selectedColor?.id === colorItem.id ? "border-success border-2" : "border-secondary"
                          }`}
                          style={{ cursor: "pointer", width: "60px", height: "60px" }}
                        >
                          <img
                            src={colorItem.color_image}
                            alt={colorItem.color}
                            className="w-100 h-100 rounded"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {(Number(product?.category_id) === 2 ||
                  Number(product?.category_id) === 5) && (
                  <>
                    <hr className="w-90" />
                    <div
                      className="d-flex align-items-center justify-content-center p-2 w-btn-25 rounded mb-4"
                      style={{
                        background: "#8cc63f",
                        color: "white",
                        fontWeight: "600",
                      }}
                    >
                      {t("Product details")}
                    </div>
                  </>
                )}
                <div className="row gap-3 justify-content-center justify-content-lg-start mb-4">
                  {Number(product?.category_id) === 5 ? (
                    <div className="w-90">
                      {product?.spec_tables?.map((table: any) => (
                        <div key={table.id} className="mt-1">
                          <div
                            className="rounded-3 shadow-sm overflow-hidden border bg-white"
                            style={{ maxWidth: "100%", margin: "0 auto" }}
                          >
                            <div className="table-responsive">
                              <table
                                className="table align-middle mb-0 border"
                                style={{
                                  borderCollapse: "separate",
                                  borderSpacing: 0,
                                  textAlign: "center",
                                }}
                              >
                                <thead style={{ backgroundColor: "#f5f7fa" }}>
                                  <tr>
                                    <th
                                      style={{
                                        border: "none",
                                        fontWeight: 600,
                                      }}
                                      className="bg-light"
                                    ></th>
                                    {table.columns.map((col: any, idx: any) => (
                                      <th
                                        key={idx}
                                        className="bg-light"
                                        style={{
                                          border: "none",
                                          fontWeight: 600,
                                        }}
                                      >
                                        {i18n.language === "en"
                                          ? col.name_en
                                          : col.name}
                                        {col.unit && (
                                          <span
                                            style={{
                                              display: "block",
                                              fontSize: "0.8rem",
                                              color: "gray",
                                              fontWeight: 400,
                                            }}
                                          >
                                            ({col.unit})
                                          </span>
                                        )}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {table.rows.map((row: any, idx: any) => (
                                    <tr
                                      key={idx}
                                      style={{
                                        backgroundColor:
                                          idx % 2 === 0 ? "#fafafa" : "#ffffff",
                                      }}
                                    >
                                      <td
                                        style={{
                                          fontWeight: 600,
                                          color: "#333",
                                          textWrap: "nowrap",
                                        }}
                                        className="bg-light"
                                      >
                                        {row.label}
                                      </td>
                                      {row.values.map((val: any, i: any) => (
                                        <td key={i} style={{ color: "#555" }}>
                                          {val}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : Number(product?.category_id) === 2 ||
                    Number(product?.category_id) === 4 ? (
                    <>
                      {productSpecifications?.map(
                        (item, index) =>
                          item.value &&
                          item.value !== "undefined" && (
                            <div
                              key={index}
                              className="col-md-3 col-5 bg-light rounded text-center"
                              style={{ padding: "20px 0px 5px" }}
                            >
                              <h5
                                dangerouslySetInnerHTML={{
                                  __html: `${t(item?.label)} `,
                                }}
                                style={{ fontWeight: "600" }}
                              />
                              <span
                                dir="ltr"
                                style={{
                                  fontSize: "1.2rem",
                                  fontWeight: "600",
                                  textAlign: "center",
                                }}
                                dangerouslySetInnerHTML={{
                                  __html: `${item.value} <span class="unit">${item.unit}</span>`,
                                }}
                              />
                            </div>
                          )
                      )}
                    </>
                  ) : null}
                </div>
                <div className="border rounded-2 px-3 py-2 bg-white w-90">
                  <ul
                    className="nav-pills nav-justified mb-3 p-0"
                    id="ex1"
                    role="tablist"
                  >
                    <li className="d-flex" role="presentation">
                      <div
                        className="d-flex align-items-center justify-content-center p-2 w-btn-25 rounded"
                        style={{
                          background: "#8cc63f",
                          color: "white",
                          fontWeight: "600",
                        }}
                      >
                        {t("Specification")}
                      </div>
                    </li>
                  </ul>
                  <div className="tab-content" id="ex1-content">
                    <div
                      className="tab-pane fade show active"
                      id="ex1-pills-1"
                      role="tabpanel"
                      aria-labelledby="ex1-tab-1"
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            i18n.language === "ar"
                              ? product?.description_ar || ""
                              : product?.description_en || "",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>
      <section className="py-4">
        <div className="container">
          <div className="row">
            <div className="px-0 border rounded-2 shadow-0">
              <div className="card border-0">
                <div className="card-body">
                  <h5 className="card-title mb-4">{t("Related Product")}</h5>
                  <div className="row m-0">
                    {relatedProducts
                      ?.slice(0, 4)
                      ?.map((item: any, index: number) => (
                        <div
                          className="col-md-6 col-lg-4 col-xl-3 col-xxl-3 mb-2"
                          key={index}
                        >
                          <ProductCard
                            id={item?.id}
                            name={
                              i18n.language == "ar"
                                ? item.name_ar
                                : item.name_en
                            }
                            image={item?.images?.[0]?.url}
                            imageHover={item?.images?.[1]?.url}
                            description={
                              i18n.language == "ar"
                                ? item?.description_ar?.slice(0, 20)
                                : item?.description_en?.slice(0, 20)
                            }
                            available={item?.available}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}