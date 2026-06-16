import { useGSAP } from "@gsap/react";
import StickyHeader from "../components/StickyHeader";
import { Link } from "react-router-dom";
import useGSAPAnimation from "../hooks/animation/useGSAPAnimation";
import useCategoriesAnimation from "../hooks/animation/useCategoriesAnimation";
import SectionTitle from "../components/SectionTitle";
import useFetchData from "../hooks/general/useFetchData";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Category {
  id: number | string;
  name_en: string;
  name_ar: string;
  image: string;
  productsCounts?: number;
}

interface LayoutConfig {
  col: string;
}

interface CategoryGroup {
  items: Category[];
  patternIndex: number;
}

interface CategoryCardProps {
  category: Category;
  col: string;
  lang: string;
  t: (key: string) => string;
}

// ── Layout helpers ────────────────────────────────────────────────────────────

function getGroupLayouts(groupIndex: number): LayoutConfig[] {
  const patterns: LayoutConfig[][] = [
    // 0: large | small | small
    [{ col: "col-lg-6" }, { col: "col-lg-3" }, { col: "col-lg-3" }],
    // 1: small | small | large
    [{ col: "col-lg-3" }, { col: "col-lg-3" }, { col: "col-lg-6" }],
    // 2: equal thirds
    [{ col: "col-lg-4" }, { col: "col-lg-4" }, { col: "col-lg-4" }],
    // 3: small | large | small
    [{ col: "col-lg-3" }, { col: "col-lg-6" }, { col: "col-lg-3" }],
    // 4: two halves
    [{ col: "col-lg-6" }, { col: "col-lg-6" }],
    // 5: wide | narrow | wide
    [{ col: "col-lg-5" }, { col: "col-lg-2" }, { col: "col-lg-5" }],
    // 6: four equal quarters
    [
      { col: "col-lg-3" },
      { col: "col-lg-3" },
      { col: "col-lg-3" },
      { col: "col-lg-3" },
    ],
  ];

  return patterns[groupIndex % patterns.length];
}

const PATTERN_SIZES = [3, 3, 3, 3, 2, 3, 4];

function groupCategories(categories: Category[]): CategoryGroup[] {
  const groups: CategoryGroup[] = [];
  let i = 0;
  let patternIndex = 0;

  while (i < categories.length) {
    const size = PATTERN_SIZES[patternIndex % PATTERN_SIZES.length];
    const slice = categories.slice(i, i + size);
    groups.push({ items: slice, patternIndex });
    i += size;
    patternIndex++;
  }

  return groups;
}

// ── Card ──────────────────────────────────────────────────────────────────────

function CategoryCard({ category, col, lang, t }: CategoryCardProps) {
  const name = lang === "ar" ? category.name_ar : category.name_en;

  return (
    <div className={`${col} grid__item`}>
      <div className="position-relative overflow-hidden mb-4">
        <div
          className="category-bg d-flex align-items-center justify-content-center position-relative p-1"
          style={{
            backgroundImage: `url(${category.image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <Link
            to={`/products/${category.id}`}
            className="category-link d-flex flex-column align-items-center justify-content-center rounded"
          >
            <h1 className="font-size-1-1 m-0">{name}</h1>
            <span className="banner-link-text">{t("Browse")}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Categories() {
  useGSAP(() => {
    useGSAPAnimation();
    useCategoriesAnimation();
  });

  const { data } = useFetchData({ endpoint: "categories", params: "" });
  const categories: Category[] =
    data?.categories.filter((cat) => Number(cat.parent_id) === 0) ?? [];
  const { t, i18n } = useTranslation();

  const groups = groupCategories(categories);

  return (
    <div style={{ background: "#181414" }}>
      <StickyHeader />

      <style>{`
                /* Uniform height for all cards */
                .category-bg {
                    height: 320px;
                    background-position: center;
                }

                @media (max-width: 991px) {
                    .category-bg { height: 250px; }
                }
                @media (max-width: 575px) {
                    .category-bg { height: 200px; }
                }
            `}</style>

      <div className="position-relative d-flex justify-content-center align-items-center flex-grow-1">
        <div className="w-100 clip clip-full h-0 overflow-hidden bg-no-repeat" />
      </div>

      <div className="container">
        <SectionTitle
          title={t("Categories")}
          subTitle={t("Browse Categories")}
        />

        {groups.map((group, groupIdx) => {
          const layouts = getGroupLayouts(group.patternIndex);

          return (
            <div className="row" key={groupIdx}>
              {group.items.map((cat, itemIdx) => {
                const layout: LayoutConfig = layouts[itemIdx] ?? {
                  col: "col-lg-4",
                };

                return (
                  <CategoryCard
                    key={cat.id}
                    category={cat}
                    col={layout.col}
                    lang={i18n.language}
                    t={t}
                  />
                );
              })}
            </div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}
