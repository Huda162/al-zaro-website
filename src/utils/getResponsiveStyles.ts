export default function getResponsiveStyles() {
    const isMobile = window.innerWidth < 768

    return {
        height: isMobile ? "15rem" : "24rem",
        marginTop: isMobile ? "5rem" : "0"
    }
}   