const formError = document.querySelector('.form__error');

function validateForm (selector){
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

      const response = fetch('resources/mail.php', {
          method: 'POST',
          body: formData,
      })
      .then(
        (response) => { 
          if(response.ok){
            return response.text();
          }
        })
      .then((result) => {
        formError.textContent = result;
      })
      .catch((e) => {
        console.error(e);
        formError.textContent = "Ошибка";
      });
      
      form.reset();
    },
  });
}


validateForm('.js-form');