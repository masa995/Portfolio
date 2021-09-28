const header = document.querySelector('.js-header');
const links = document.querySelectorAll('.js-links');

const headerHeight = header.clientHeight;
const vh = window.innerHeight;

document.documentElement.style.setProperty('--vh', `${vh}px`)

links.forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    const elem = document.querySelector(href);
    const elemPosition = elem.getBoundingClientRect().top - headerHeight;
    window.scrollBy({
      top: elemPosition,
      behavior: 'smooth',
    });
  });
});

