import { useState, useEffect } from "react";
import useFetchData from "../hooks/general/useFetchData";
import { useTranslation } from "react-i18next";

export default function Socials() {
    const { data } = useFetchData({ endpoint: 'socials', params: '' });
    const { i18n } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <nav className="social" style={{ right: i18n.language === 'ar' ? 0 : '', top: isMobile ? '' : '0', bottom: isMobile ? 0 : '' }}>
            {isMobile && (
                <>
                    <button className="btn" style={{ background: '#8cc63f', borderRadius: '100%', width: '40px', height: '40px' }} onClick={() => setIsVisible(!isVisible)}>
                        <i className={`bi bi-share-fill text-white`} style={{}}></i>
                    </button>
                    <ul className={`${isVisible ? "active m-0" : "not-active m-0"}`}>
                        {data?.socials.map((social) => (
                            <li key={social.name.toLocaleLowerCase()} id={social.name.toLocaleLowerCase()}>
                                <a
                                    href={social.name === 'whatsapp' ? `https://api.whatsapp.com/send?phone=${social.url}` : social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className={`bi bi-${social.name.toLocaleLowerCase()}`}></i>
                                </a>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {!isMobile && (
                <ul>
                    {data?.socials.map((social) => (
                        <li key={social.name.toLocaleLowerCase()} id={social.name.toLocaleLowerCase()}>
                            <a
                                href={social.name === 'whatsapp' ? `https://api.whatsapp.com/send?phone=${social.url}` : social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className={`bi bi-${social.name.toLocaleLowerCase()}`}></i>
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
}
