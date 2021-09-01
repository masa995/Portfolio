const swiper = document.querySelector('.slider');
const header = document.querySelector('.js-header');
const links = document.querySelectorAll('.js-links');

const headerHeight = header.clientHeight; //clientHeight: VISIBLE content & padding
const vh = window.innerHeight;

document.documentElement.style.setProperty('--vh', `${vh}px`)

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

links.forEach((el) => {
  el.addEventListener('click', (e) =>{
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href'); //берем  id секции куда нужно перенестись
    // console.log(href);
    const elem = document.querySelector(href); //достаем объект
    // console.log(elem);
    /*getBoundingClientRect() - возвращает объект DOMRect, который содержит размеры элемента
     и его положение относительно видимой области просмотра*/
    const elemPosition = elem.getBoundingClientRect().top - headerHeight; 
    // console.log(elemPosition);
    window.scrollBy({
      top: elemPosition,
      behavior: 'smooth', 
    });
  });
});

function validateForms (selector){
  new window.JustValidate(selector,{
    rules: {
      name : {
        required: true
      },

      email: {
        required: true,
        email: true
      },

      text: {
        required: true
      }
    },

    messages: {
      name: {
        required: 'Введите имя',
      },

      email: {
        required: 'Введите почту',
        email: 'Неверный формат почты'
      },

      text: {
        required: 'Введите сообщение'
      }
    },

    submitHandler: function (form) {
      const formData = new FormData(form);

      const sendData = async (formData) => {
       
       try{
          const response = await fetch ('../resources/mail.php',{
            method: 'POST',
            body: formData
          });

          if (!response.ok){
            throw new Error(response.statusText);
          }

          const answer =  await response.text();
        } catch (e){
         console.error(e);
        } 
      } 

      form.reset();
      console.log("Отправка успешна!");
    },
  });
}

validateForms('.js-form');