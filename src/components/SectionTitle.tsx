type SectionTitleProps = {
    title: string
    subTitle: string
}
export default function SectionTitle({ title, subTitle }: SectionTitleProps) {
    return (
        <div className="mx-auto text-center mb-5 categories-title mt-5">
            <h5 className="section-title px-3  text-white">{title}</h5>
            <h1 className="mb-0  text-white">{subTitle}</h1>
        </div>
    )
}