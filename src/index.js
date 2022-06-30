import { fetchImage, resetPage, page, per_page } from './js/fetchPixabay';
import { refs } from './js/refs';
import { markupImage } from './js/markup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const clsHidden = 'is-hidden';
let query = '';
let total = 0;
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
console.log(refs.gallery);
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
      console.log(`Hooray! We found ${total} images.`);
      materials.hits.forEach(element => {
        refs.gallery.insertAdjacentHTML('beforeend', markupImage(element));
      });
      if (total > per_page) {
        showBtn(refs.btnLoadMore);
      }
      // scrollSmooth();
      lightbox.refresh();
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

      lightbox.refresh();
    })
    .catch(console.log);

  if (checkPage === page) {
    console.log(`We're sorry, but you've reached the end of search results.`);
    hideBtn(refs.btnLoadMore);
    return;
  }
}

// function scrollSmooth() {
//   const { height: cardHeight } =
//     refs.gallery.firstElementChild.getBoundingClientRect();

//   // const cardHeight = 1000;

//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//   });
// }

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
