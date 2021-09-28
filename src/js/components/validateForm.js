const form = document.querySelector('.js-form')
const formMessage = document.querySelector('.form__message');

function validateForm(selector) {
  new window.JustValidate(selector, {
    rules: {
      name: {
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
            if (response.ok) {
              return response.text();
            }
          })
        .then((result) => {
          formMessage.textContent = result;
          setTimeout(() => formMessage.textContent = ' ', 12000);
        })
        .catch((e) => {
          console.error(e);
          formMessage.textContent = 'Ошибка';

          setTimeout(() => formMessage.textContent = ' ', 12000);
        })
      form.reset();
    }
  });
}
validateForm('.js-form');