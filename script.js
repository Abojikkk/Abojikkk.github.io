const header = document.querySelector('[data-header]');
const year = document.querySelector('[data-year]');
year.textContent = new Date().getFullYear();

const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const lightbox = document.querySelector('[data-lightbox]');
const lightboxImage = document.querySelector('[data-lightbox-image]');
const lightboxCaption = document.querySelector('[data-lightbox-caption]');
const lightboxClose = document.querySelector('[data-lightbox-close]');

document.querySelectorAll('.photo-card').forEach((card) => {
  card.addEventListener('click', () => {
    const image = card.querySelector('img');
    lightboxImage.src = card.dataset.full;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = card.dataset.caption;
    lightbox.showModal();
  });
});

lightboxClose?.addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});
