import { fetchImage, resetPage, page, per_page } from './js/fetchPixabay';
import { refs } from './js/refs';
import { markupImage } from './js/markup';

const clsHidden = 'is-hidden';
let query = '';
let total = 0;
console.log(refs);

refs.form.addEventListener('submit', onClickSubmit);
refs.btnLoadMore.addEventListener('click', onClickLoadMore);

function onClickSubmit(event) {
  event.preventDefault();
  clearMarkup();
  hideBtn(refs.btnLoadMore);
  resetPage();
  query = refs.form.elements.searchQuery.value.trim().toLowerCase();

  if (query.length < 3) {
    console.log('few characters to search');
    return;
  }

  fetchImage(query)
    .then(materials => {
      total = parseInt(materials.total, 10);
      console.log(materials.total);
      if (!materials.hits.length) {
        console.log(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      materials.hits.forEach(element => {
        refs.gallery.insertAdjacentHTML('beforeend', markupImage(element));
      });
      if (total > per_page) {
        showBtn(refs.btnLoadMore);
      }
      refs.form.reset();
    })
    .catch(console.log);
}

function onClickLoadMore() {
  console.log('Load more');
  const checkPage = Math.ceil(total / per_page);

  fetchImage(query)
    .then(materials => {
      console.log(materials.total);
      materials.hits.forEach(element => {
        refs.gallery.insertAdjacentHTML('beforeend', markupImage(element));
      });
    })
    .catch(console.log);

  if (checkPage === page) {
    console.log('Last page');
    hideBtn(refs.btnLoadMore);
    return;
  }
}

function clearMarkup() {
  refs.gallery.innerHTML = '';
}

function showBtn(btn) {
  if (btn.classList.contains(clsHidden)) {
    btn.classList.remove(clsHidden);
  }
}

function hideBtn(btn) {
  if (!btn.classList.contains(clsHidden)) {
    btn.classList.add(clsHidden);
  }
}
