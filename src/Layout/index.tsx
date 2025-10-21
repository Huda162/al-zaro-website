import { ReactNode } from "react";
import Footer from "../components/Footer";
import StickyHeader from "../components/StickyHeader";

export default function Layout(props: { children: ReactNode }) {
    return (
        <main>
            <StickyHeader />
            {props.children}
            <Footer />
        </main>
    )
}