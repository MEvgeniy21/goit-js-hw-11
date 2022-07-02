import { fetchImage, resetPage, page, per_page } from './js/fetchPixabay';
import { refs, showBtn, hideBtn } from './js/general';
import { markupImage } from './js/markup';
import { observerUpScroll, observerUpScrollReset } from './js/scroll';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let query = '';
let total = 0;

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.form.addEventListener('submit', onClickSubmit);
refs.btnLoadMore.addEventListener('click', onClickLoadMore);
refs.btnUpScroll.addEventListener('click', onClickUpScroll);

function onClickSubmit(event) {
  event.preventDefault();
  observerUpScrollReset();
  clearMarkup();
  hideBtn(refs.btnLoadMore);
  resetPage();
  query = refs.form.elements.searchQuery.value.trim().toLowerCase();

  if (query.length < 3) {
    // console.log('few characters to search');
    Notify.failure('Few characters to search');
    return;
  }

  fetchImage(query)
    .then(materials => {
      total = parseInt(materials.total, 10);

      if (!materials.hits.length) {
        // console.log(
        //   'Sorry, there are no images matching your search query. Please try again.'
        // );
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      // console.log(`Hooray! We found ${total} images.`);
      Notify.success(`Hooray! We found ${total} images.`);
      materials.hits.forEach(element => {
        refs.gallery.insertAdjacentHTML('beforeend', markupImage(element));
      });
      if (total > per_page) {
        showBtn(refs.btnLoadMore);
      }
      observerUpScroll();
      lightbox.refresh();
      refs.form.reset();
    })
    .catch(console.log);
}

function onClickLoadMore() {
  const checkPage = Math.ceil(total / per_page);

  fetchImage(query)
    .then(materials => {
      materials.hits.forEach(element => {
        refs.gallery.insertAdjacentHTML('beforeend', markupImage(element));
      });

      lightbox.refresh();
      scrollLoadMore();
    })
    .catch(console.log);

  if (checkPage === page) {
    Notify.info(`We're sorry, but you've reached the end of search results.`);
    // console.log(`We're sorry, but you've reached the end of search results.`);
    hideBtn(refs.btnLoadMore);
    return;
  }
}

function onClickUpScroll() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function scrollLoadMore() {
  const { height: cardHeight } =
    refs.gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function clearMarkup() {
  refs.gallery.innerHTML = '';
}
