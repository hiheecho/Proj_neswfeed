const swiper = new Swiper('.swiper', {
    slidesPerView: 3,
    spaceBetween: 30,
    slidesPerGroup: 3, 
    loop: true,
    // Navigation arrows
    
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
});
