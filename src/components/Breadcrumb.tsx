import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

type BreadcrumbProps = {
    parent: string
    child: string
    subChild: string
    childLink: string
}
export default function Breadcrumb({ parent, child, subChild, childLink }: BreadcrumbProps) {
    const { i18n } = useTranslation()
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to='/'>{parent}</Link></li>
                {i18n.language == 'ar' && <li className="breadcrumb-item"><a href="#"></a></li>}
                <li className="breadcrumb-item"><Link to={childLink}>{child}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">{subChild}</li>
            </ol>
        </nav>
    )
}