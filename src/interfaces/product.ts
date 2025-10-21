
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

export interface Prdouct {
    id: number
    name_ar: string
    name_en: string
    name_he: string
    description_ar: string
    description_en: string
    description_he: string
    price_nis: number
    price_usd: number
    price_jod: number
    category_id: number
    stove_power: string
    weight: string
    dimension: string
    glass: string
    heating_area: string
    door_opening: string
    brand_id: null,
    discount_percentage: number
    points: null,
    available: boolean
    is_offer: boolean
    ordered_number: number
    order_number: number
    images: Image[]
    category_name: CategoryName
    spec_tables:[]

}