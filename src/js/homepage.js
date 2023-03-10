import { FimlsApi } from './film-service';
import { pagination, showPagination, hidePagination } from './tui-pagination';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { showLoader, hideLoader } from './loader';
import { refs } from './refs';
import { createHomepageCards } from './cards-home';

const filmsApi = new FimlsApi();
const page = pagination.getCurrentPage();
const errorText = {
  noQuery: 'Please enter your query',
  noResults:
    'Search result not successful. Enter the correct movie name and try again.',
};

refs.form.addEventListener('submit', onFormSubmit);

filmsApi
  .getTrendingFilms(page)
  .then(({ results, total_pages }) => {
    pagination.reset(total_pages);
    renderCards(results);
    showPagination();
  })
  .catch(err => {
    hidePagination();
    console.log(err.message);
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
    console.log(err.message);
  } finally {
    scrollToTop();
    hideLoader();
  }
}

async function onFormSubmit(e) {
  e.preventDefault();
  hidePagination();
  pagination.off('afterMove', loadMoreTrendingFilms);
  pagination.off('afterMove', loadMoreSearchingFilms);
  const searchValue = e.currentTarget.elements.query.value.trim();
  if (!searchValue) return showErr(errorText.noQuery);

  filmsApi.query = searchValue;

  try {
    showLoader();
    const { results, total_pages } = await filmsApi.getFilmsByKeyword(page);
    if (results.length === 0) return showErr(errorText.noResults);
    refs.errText.innerText = '';
    pagination.reset(total_pages);
    renderCards(results);
    showPagination();
  } catch (err) {
    hidePagination();
    console.log(err.message);
  } finally {
    hideLoader();
    pagination.on('afterMove', loadMoreSearchingFilms);
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
    console.log(err.message);
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

function showErr(message) {
  refs.header.classList.add('rejected');
  refs.errText.classList.add('rejected');
  refs.errText.innerText = message;
}
