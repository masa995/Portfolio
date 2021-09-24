const swiper = document.querySelector('.slider');

const slider = new Swiper(swiper, {
  // Optional parameters
	slidesPerView: 1,
    loop: false,

    effect: 'fade',
  	fadeEffect: {
    crossFade: true
  },

   navigation: {
    nextEl: '.btn-right',
    prevEl: '.btn-left',
  },
});
