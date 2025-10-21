import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import AboutUs from "./views/Aboutus";
import ContactUs from "./views/Contactus";
import Custom404 from "./views/404";
import Categories from "./views/Categories";
import Products from "./views/Products";
import ProductDetails from "./views/ProductDetails";

export default function Routers() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path='/contact' element={<ContactUs />} />
            <Route path='*' element={<Custom404 />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/products/:id' element={<Products />} />
            <Route path='/product-details/:id' element={<ProductDetails />} />
        </Routes>
    )
}