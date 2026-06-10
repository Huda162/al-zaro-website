
export interface Image {
    id: number
    url: string
    type: string
    product_id: number
}
export interface CategoryName {
    id: number
    name_ar: string
    name_en: string
    name_he: string
    image: string
    parent_id: number
}
export interface ProductColor {
    id: number;
    product_id: string;
    color: string;
    color_image: string;
  }
export interface Product {
    id: number;
    name_ar: string;
    name_en: string;
    name_he: string;
    description_ar: string;
    description_en: string;
    description_he: string;
    price_nis: string;
    price_usd: string;
    price_jod: string;
    category_id: string;
    stove_power: string | null;
    weight: string | null;
    dimension: string | null;
    glass: string | null;
    heating_area: string | null;
    door_opening: string | null;
    brand_id: number | null;
    discount_percentage: string;
    points: number | null;
    available: string;
    is_offer: string;
    ordered_number: string;
    order_number: string;
    images: Image[];
    category_name: CategoryName;
    product_sizes: any[];
    product_colors: ProductColor[];
    spec_tables: any[];
  }