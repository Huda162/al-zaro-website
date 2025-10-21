import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type ProductCardProps = {
    id: number;
    image: string;
    imageHover: string;
    description: string;
    name: string
    available: boolean
}
export default function ProductCard({ id, image, imageHover, description, name, available }: ProductCardProps) {
    const navigate = useNavigate()
    const { t } = useTranslation()

    return (
        <>

            <div className="product_card">
                <div className="product_card_slider_container">
                    <div className=" product_card_item" onClick={() => navigate(`/product-details/${id}`)}>
                        <div className="product_card_image">
                            <div className="image-wrapper">
                                <img src={image} className="image" alt="normal" />
                                <img src={imageHover} className="image-hover" alt="hover" />
                            </div>
                        </div>
                        <div className="product_card_content text-center">
                            <div className="product_card_info_line">
                                <div className="product_card_item_name mb-2">
                                    {name}
                                </div>
                                <span className="product_card_des m-0">{description} </span>
                            </div>
                            <div className="available">
                                <div className="available_line">
                                    <div className="available_title d-flex align-items-center justify-content-center ">
                                        <div className="p-2 rounded w-50"
                                            style={{ background: available ? '#8cc63f' : "#595351", color: 'white', fontWeight: '600', fontSize: '.8rem' }}
                                        >
                                            {available ? t("In stock") : t("unavailable")}
                                        </div>
                                    </div>
                                    <div className="sold_stars ml-auto"> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}