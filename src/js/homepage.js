import { FimlsApi } from './film-service';
import { pagination, showPagination, hidePagination } from './tui-pagination';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { showLoader, hideLoader } from './loader';
import { refs } from './refs';
import { createHomepageCards } from './cards-home';

const filmsApi = new FimlsApi();
const page = pagination.getCurrentPage();

refs.form.addEventListener('submit', onFormSubmit);

showLoader();
filmsApi
  .getTrendingFilms(page)
  .then(({ results, total_pages }) => {
    pagination.reset(total_pages);
    renderCards(results);
    showPagination();
  })
  .catch(err => {
    hidePagination();
    Notify.failure(err.message);
  })
  .finally(() => {
    hideLoader();
  });

pagination.on('afterMove', loadMoreTrendingFilms);

async function loadMoreTrendingFilms(e) {
  const currentPage = e.page;
  try {
    showLoader();
    const { results } = await filmsApi.getTrendingFilms(currentPage);
    renderCards(results);
  } catch (err) {
    hidePagination();
    Notify.failure(err.message);
  } finally {
    scrollToTop();
    hideLoader();
  }
}

async function onFormSubmit(e) {
  e.preventDefault();
  pagination.off('afterMove', loadMoreTrendingFilms);
  pagination.off('afterMove', loadMoreSearchingFilms);
  pagination.on('afterMove', loadMoreSearchingFilms);
  hidePagination();
  refs.list.innerHTML = '';

  const searchValue = e.currentTarget.elements.query.value.trim();
  if (!searchValue) {
    return Notify.failure('Please enter your query');
  }

  filmsApi.query = searchValue;

  try {
    showLoader();
    const { results, total_pages } = await filmsApi.getFilmsByKeyword(page);
    if (results.length === 0) {
      return Notify.failure('Enter correct query!');
    }
    pagination.reset(total_pages);
    renderCards(results);
    showPagination();
  } catch (err) {
    hidePagination();
    Notify.failure(err.message);
  } finally {
    hideLoader();
  }
}

async function loadMoreSearchingFilms(e) {
  const currentPage = e.page;
  try {
    showLoader();
    const { results } = await filmsApi.getFilmsByKeyword(currentPage);
    renderCards(results);
  } catch (err) {
    hidePagination();
    Notify.failure(err.message);
  } finally {
    scrollToTop();
    hideLoader();
  }
}

function renderCards(results) {
  const markup = createHomepageCards(results);
  refs.list.innerHTML = markup;
}

function scrollToTop() {
  window.scroll({
    top: 0,
    behavior: 'smooth',
  });
}
