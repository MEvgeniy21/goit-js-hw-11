export const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more'),
  btnUpScroll: document.querySelector('.topbutton'),
};

export const clsHidden = 'is-hidden';

export function showBtn(btn) {
  if (btn.classList.contains(clsHidden)) {
    btn.classList.remove(clsHidden);
  }
}

export function hideBtn(btn) {
  if (!btn.classList.contains(clsHidden)) {
    btn.classList.add(clsHidden);
  }
}
