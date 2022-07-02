import { refs, clsHidden, showBtn, hideBtn } from './general';

const margin = 300;
const optionsObservUpScroll = {
  rootMargin: `${margin}px`,
  threshold: 1.0,
};
const callbackUpScroll = function (entries, observer) {
  const offset = parseInt(window.pageYOffset, 10);

  if (!offset) {
    hideBtn(refs.btnUpScroll);
  } else {
    refs.btnUpScroll.classList.toggle(clsHidden);
  }
};

const observer = new IntersectionObserver(
  callbackUpScroll,
  optionsObservUpScroll
);

export function observerUpScroll() {
  observer.observe(refs.gallery.firstElementChild);
}
export function observerUpScrollReset() {
  if (refs.gallery.firstElementChild) {
    observer.unobserve(refs.gallery.firstElementChild);
  }
}
