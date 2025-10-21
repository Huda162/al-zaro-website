import gsap from "gsap";

export default function useCategoriesAnimation() {

    const items = gsap.utils.toArray(".category-link");
    gsap.from(items, {
        opacity: 0,
        y: 70,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        delay: 1.5
    });

    gsap.from('.grid__item, .categories-title', {
        opacity: 0,
        y: 5,
        duration: 1,
        ease: 'sine.out',
        stagger: 0.1,
        delay: 1.3
    });

}