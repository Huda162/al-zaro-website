import { RefObject, useEffect } from "react"
type UseClickOutsideProps = {
    ref: RefObject<HTMLElement>
    setOpen: (open: boolean) => void
}
export default function useClickOutside({ ref, setOpen }: UseClickOutsideProps) {

    const handleClickOutside = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            setOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.addEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return { handleClickOutside }
}