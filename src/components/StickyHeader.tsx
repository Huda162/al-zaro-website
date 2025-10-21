import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import useClickOutside from "../hooks/general/useClickOutside";
import useChangeLanguage from "../hooks/general/useChangeLanguage";

export default function StickyHeader() {
    let location = useLocation();
    const [isSticky, setIsSticky] = useState(false);
    const [show, setShow] = useState(false);
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false)
    const ref = useRef(null)

    // @ts-ignore
    const { handleClickOutside } = useClickOutside({ ref, setOpen })

    const changeLanguage = useChangeLanguage()
    const currentLanguage = i18n.language
    const otherLanguage = currentLanguage == 'ar' ? "en" : 'ar'

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsSticky(scrollTop > 45);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const isMobile = window.innerWidth < 768

    return (
        <nav className={`navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0 justify-content-between ${isSticky ? 'sticky-top shadow-sm' : ''}`}>
            <div className="d-xl-none d-flex gap-4">
                <button className={`navbar-toggler ${show ? "" : "collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" onClick={() => setShow(!show)}>
                    <i className="bi bi-list"></i>
                </button>
                <div>
                    <button
                        id="dropdownMenuLink"
                        onClick={() => setOpen(!open)}
                        aria-expanded={open}
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: '10px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            color: 'white',
                            fontWeight: '700',
                            gap: '10px'
                        }}

                    >
                        {currentLanguage.toLocaleUpperCase()}<i className="bi bi-caret-down-fill"></i>
                    </button>
                    <div className={`dropdown-menu ${open ? "show" : ""}`} aria-labelledby="dropdownMenuLink">
                        <div className="dropdown-item" role="button" onClick={() => {
                            changeLanguage(otherLanguage)
                            setOpen(false)
                        }}>
                            {otherLanguage.toLocaleUpperCase()}
                        </div>
                    </div>
                </div>
            </div>


            <Link to='/' className="navbar-brand p-0">
                <img src="/assets/img/logo2.png" alt="Logo" />
            </Link>

            <div className={`collapse navbar-collapse flex-grow-0 gap-5 ${show ? "show" : ""}`} id="navbarCollapse">
                <div className="navbar-nav ms-auto py-0">
                    <div className="p-1 p-xl-3">
                        <Link to='/' className={`nav-item nav-link ${location.pathname === '/' ? "active" : ""}`}>{t("Home")}</Link>
                    </div>
                    <div className="p-1 p-xl-3">
                        <Link to='/categories' className={`nav-item nav-link ${location.pathname === '/categories' ? "active" : ""}`}>{t("Categories")}</Link>
                    </div>
                    <div className="p-1 p-xl-3">
                        <Link to='/about' className={`nav-item nav-link ${location.pathname === '/about' ? "active" : ""}`}>{t("About us")}</Link>
                    </div>
                    <div className="p-1 p-xl-3">
                        <Link to='/contact' className={`nav-item nav-link ${location.pathname === '/contact' ? "active" : ""}`}>{t("Contact us")}</Link>
                    </div>
                </div>
            </div>

            <div className="d-none d-lg-block" ref={isMobile ? null : ref}>
                <div className="">
                    <button
                        id="dropdownMenuLink"
                        onClick={() => setOpen(!open)}
                        aria-expanded={open}
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: '10px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center'
                        }}

                    >
                        <img src="/assets/img/lang.svg" alt="" width={30} />
                    </button>
                    <div className={`dropdown-menu ${open ? "show" : ""}`} aria-labelledby="dropdownMenuLink">
                        <div className="dropdown-item" role="button" onClick={() => { changeLanguage('en'); setOpen(false) }}>
                            EN
                        </div>
                        <div className="dropdown-item" role="button" onClick={() => { changeLanguage('ar'); setOpen(false) }}>
                            AR
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
