var swiper = new Swiper(".swiper-news", {
    spaceBetween: 20,
    slidesPerView: 3,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 20
        }
    }
});