import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function useChangeLanguage() {
    const { i18n } = useTranslation()

    const changeLanguage = (lng: any) => {
        i18n.changeLanguage(lng)
    }

    useEffect(() => {
        if (i18n.language == 'ar') {
            document.body.classList.add('rtl')
            document.body.classList.remove('ltr')
        } else {
            document.body.classList.add('ltr')
            document.body.classList.remove('rtl')
        }
    }, [i18n.language])

    return changeLanguage
}