import { useEffect, useRef, useState } from "react";
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
  const param = useParams();
  const {
    handleSortChange,
    filterProduct,
    handleNameChange,
    handlePageChange,
    filteredProducts,
    filters,
} = useFilterProducts(param);

useEffect(() => {
    filterProduct();
}, [filters]);

  const { data } = useFetchData({ endpoint: "categories", params: "" });
  const { i18n, t } = useTranslation();

  // ── Pagination state ──


  const [name, setName] = useState("");
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filters.page]);
  useGSAP(() => {
    useGSAPAnimation();
  });

  const isRtl = i18n.language === "ar";

  const category = data?.categories?.find(
    (item) => item.id == Number(param.id)
  );

  const subcategories =
    data?.categories?.filter(
      (cat) => Number(cat.parent_id) === Number(param.id)
    ) ?? [];

  const isParentCategory =
    category && Number(category.parent_id) === 0 && subcategories.length > 0;

  return (
    <div>
      <div style={{ background: "#181414" }}>
        <StickyHeader />
      </div>
      <div className="position-relative d-flex justify-content-center align-items-center flex-grow-1">
        <div className="w-100 clip clip-full h-0 overflow-hidden bg-no-repeat"></div>
      </div>

      <div className="container">
        <div className="row mb-4">
          <div className="d-block d-md-none">
            <Breadcrumb
              parent={t("Home")}
              child={t("Categories")}
              subChild={`${isRtl ? category?.name_ar : category?.name_en}`}
              childLink={"/categories"}
            />
          </div>

          <div className="col-md-3 mt-5 d-none d-xl-block d-xxl-block">
            <div className="card" style={{ background: "#f6f1ea", border: 0 }}>
              <div className="row d-flex justify-content-center align-items-center mb-4">
                <div style={{ padding: "20px 50px 0px 50px" }}>
                  <div className="form" dir="ltr">
                    <input
                      style={{ borderRadius: "50px", border: 0 }}
                      type="text"
                      className="form-control form-input p-3"
                      placeholder={t("Search product...")}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <span
                      className="left-pan"
                      role="button"
                      onClick={() => handleNameChange(name)}
                    >
                      <i className="bi bi-search"></i>
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Subcategory grid ── */}
              {isParentCategory && (
                <div
                  style={{
                    margin: "0 12px 16px",
                    borderRadius: "12px",
                    padding: "12px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.09em",
                      textTransform: "uppercase",
                      color: "#666",
                      margin: "0 0 10px",
                    }}
                  >
                    {t("subcategories")}
                  </p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "8px",
                    }}
                  >
                    {subcategories.map((sub: any, i: number) => (
                      <Link
                        key={i}
                        to={`/products/${sub.id}`}
                        style={{
                          textDecoration: "none",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            aspectRatio: "1",
                            borderRadius: "8px",
                            overflow: "hidden",
                            border: "1.5px solid rgba(98,159,18,0.3)",
                            background: "#2a2a2a",
                            transition: "border-color 0.2s, transform 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLDivElement;
                            el.style.borderColor = "#629f12";
                            el.style.transform = "scale(1.06)";
                          }}
                          onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLDivElement;
                            el.style.borderColor = "rgba(98,159,18,0.3)";
                            el.style.transform = "scale(1)";
                          }}
                        >
                          {sub?.image ? (
                            <img
                              src={sub.image}
                              alt={isRtl ? sub.name_ar : sub.name_en}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#629f12",
                                fontSize: "20px",
                                opacity: 0.4,
                              }}
                            >
                              <i className="bi bi-grid"></i>
                            </div>
                          )}
                        </div>
                        <span
                          style={{
                            fontSize: "10px",
                            fontWeight: 600,
                            color: "#bbb",
                            textAlign: "center",
                            width: "100%",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {isRtl ? sub.name_ar : sub.name_en}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {/* ── end subcategory grid ── */}

              <div style={{ padding: "0 12px 16px" }}>
                <h4
                  className="mb-3 px-1"
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#888",
                  }}
                >
                  {t("Categories")}
                </h4>

                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {data?.categories
                    ?.filter((cat) => Number(cat.parent_id) === 0)
                    .map((item: any, index: number) => {
                      const itemSubcategories =
                        data?.categories?.filter(
                          (cat) => Number(cat.parent_id) === item.id
                        ) ?? [];
                      const label = isRtl ? item?.name_ar : item?.name_en;

                      return (
                        <li key={index} style={{ marginBottom: "2px" }}>
                          <Link
                            to={`/products/${item?.id}`}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: "8px 10px",
                              borderRadius: "8px",
                              textDecoration: "none",
                              color: "inherit",
                              fontWeight: 600,
                              fontSize: "14px",
                              transition: "background 0.15s",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background =
                                "rgba(98,159,18,0.08)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = "transparent")
                            }
                          >
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                              }}
                            >
                              <i
                                className={`bi bi-arrow-${isRtl ? "left" : "right"}-short`}
                                style={{ color: "#629f12", fontSize: "18px" }}
                              ></i>
                              {label}
                            </span>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: 500,
                                background: "rgba(98,159,18,0.12)",
                                color: "#629f12",
                                borderRadius: "20px",
                                padding: "1px 8px",
                              }}
                            >
                              {item?.productsCounts}
                            </span>
                          </Link>

                          {itemSubcategories.length > 0 && (
                            <ul
                              style={{
                                listStyle: "none",
                                padding: isRtl
                                  ? "2px 16px 6px 0"
                                  : "2px 0 6px 16px",
                                margin: 0,
                                borderLeft: isRtl
                                  ? "none"
                                  : "2px solid rgba(98,159,18,0.2)",
                                borderRight: isRtl
                                  ? "2px solid rgba(98,159,18,0.2)"
                                  : "none",
                              }}
                            >
                              {itemSubcategories.map(
                                (sub: any, subIndex: number) => (
                                  <li key={subIndex}>
                                    <Link
                                      to={`/products/${sub?.id}`}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "6px 10px",
                                        borderRadius: "6px",
                                        textDecoration: "none",
                                        color: "inherit",
                                        fontSize: "13px",
                                        transition: "background 0.15s",
                                      }}
                                      onMouseEnter={(e) =>
                                        (e.currentTarget.style.background =
                                          "rgba(98,159,18,0.06)")
                                      }
                                      onMouseLeave={(e) =>
                                        (e.currentTarget.style.background =
                                          "transparent")
                                      }
                                    >
                                      <span style={{ color: "#555" }}>
                                        {isRtl ? sub?.name_ar : sub?.name_en}
                                      </span>
                                      <span
                                        style={{ fontSize: "11px", color: "#aaa" }}
                                      >
                                        {sub?.productsCounts}
                                      </span>
                                    </Link>
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-12 col-xl-8 col-xxl-8 mt-5">
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <p className="mb-0 text-black">
                {t("Showing all")} {filteredProducts?.data?.length}{" "}
                {t("results")} {t("of")} {filteredProducts?.total}
              </p>
              <form className="filter" dir="ltr">
                <div className="dropdown">
                  <select
                    className="dropdown-select"
                    onChange={(e) => handleSortChange(e.target.value)}
                  >
                    <option value="" selected>
                      {t("Default sorting")}
                    </option>
                    <option value="most_ordered">
                      {t("Sort by popularity")}
                    </option>
                    <option value="latest">{t("Sort by latest")}</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="row mb-5">
              {filteredProducts?.data?.map((product: any) => (
                <div className="col-md-4 mb-2" key={product?.id}>
                  <ProductCard
                    id={product?.id}
                    name={isRtl ? product.name_ar : product.name_en}
                    image={product?.images?.[0]?.url}
                    imageHover={product?.images?.[1]?.url}
                    description={
                      isRtl
                        ? product?.description_ar?.slice(0, 20)
                        : product?.description_en?.slice(0, 20)
                    }
                    available={product?.available}
                  />
                </div>
              ))}
            </div>

            {/* ── Pagination controls ── */}
            {filteredProducts?.last_page > 1 && (
              <nav
                aria-label="Products pagination"
                className="d-flex justify-content-center mb-5"
              >
                <ul
                  style={{
                    display: "flex",
                    listStyle: "none",
                    gap: "6px",
                    padding: 0,
                    margin: 0,
                    flexWrap: "wrap",
                  }}
                >
                  {/* Prev */}
                  <li>
                    <button
                      type="button"
                      disabled={!filteredProducts?.prev_page_url}
                      onClick={() => handlePageChange(page - 1)}
                      style={{
                        border: "1px solid rgba(98,159,18,0.3)",
                        borderRadius: "8px",
                        padding: "6px 12px",
                        background: "#fff",
                        color: filteredProducts?.prev_page_url
                          ? "#333"
                          : "#ccc",
                        cursor: filteredProducts?.prev_page_url
                          ? "pointer"
                          : "not-allowed",
                      }}
                    >
                      <i
                        className={`bi bi-chevron-${isRtl ? "right" : "left"}`}
                      ></i>
                    </button>
                  </li>

                  {/* Page numbers */}
                  {Array.from(
                    { length: filteredProducts?.last_page ?? 1 },
                    (_, i) => i + 1
                  ).map((p) => (
                    <li key={p}>
                      <button
                        type="button"
                        onClick={() => handlePageChange(p)}
                        style={{
                          border: "1px solid rgba(98,159,18,0.3)",
                          borderRadius: "8px",
                          padding: "6px 12px",
                          minWidth: "36px",
                          fontWeight: p === filters.page ? 700 : 500,
                          background: p === filters.page ? "#629f12" : "#fff",
                          color: p === filters.page ? "#fff" : "#333",
                          cursor: "pointer",
                        }}
                      >
                        {p}
                      </button>
                    </li>
                  ))}

                  {/* Next */}
                  <li>
                    <button
                      type="button"
                      disabled={!filteredProducts?.next_page_url}
                      onClick={() => handlePageChange(page + 1)}
                      style={{
                        border: "1px solid rgba(98,159,18,0.3)",
                        borderRadius: "8px",
                        padding: "6px 12px",
                        background: "#fff",
                        color: filteredProducts?.next_page_url
                          ? "#333"
                          : "#ccc",
                        cursor: filteredProducts?.next_page_url
                          ? "pointer"
                          : "not-allowed",
                      }}
                    >
                      <i
                        className={`bi bi-chevron-${isRtl ? "left" : "right"}`}
                      ></i>
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}