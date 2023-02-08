import { FimlsApi } from './film-service';
import { pagination, TuiPagination } from './tui-pagination';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loader } from './loader';
import { refs } from './refs';

// функції для homepage

const filmsApi = new FimlsApi();
const loader = new Loader();
const tuiPagination = new TuiPagination();
const page = pagination.getCurrentPage();

// refs.homapageForm.addEventListener('submit', onFormSubmit);

// loader.show();
// filmsApi
//   .getTrendingFilms(page)
//   .then(({ results, total_pages }) => {
//     pagination.reset(total_pages);
//     renderCards(results);
//     tuiPagination.show();
//   })
//   .catch(err => {
//     Notify.failure(err.message);
//   })
//   .finally(() => {
//     loader.hide();
//   });

// pagination.on('afterMove', loadMoreTrendingFilms);

async function loadMoreTrendingFilms(e) {
  const currentPage = e.page;
  try {
    loader.show();
    const { results } = await filmsApi.getTrendingFilms(currentPage);
    renderCards(results);
  } catch (err) {
    tuiPagination.hide();
    Notify.failure(err.message);
  } finally {
    loader.hide();
  }
}

async function onFormSubmit(e) {
  e.preventDefault();
  pagination.off('afterMove', loadMoreTrendingFilms);
  pagination.off('afterMove', loadMoreSearchingFilms);
  pagination.on('afterMove', loadMoreSearchingFilms);
  tuiPagination.hide();
  refs.list.innerHTML = '';

  const searchValue = e.currentTarget.elements.query.value.trim();
  if (!searchValue) {
    return Notify.failure('Please enter your query');
  }

  filmsApi.query = searchValue;

  try {
    loader.show();
    const { results, total_pages } = await filmsApi.getFilmsByKeyword(page);
    if (results.length === 0) {
      return Notify.failure('Enter correct query!');
    }
    pagination.reset(total_pages);
    renderCards(results);
    tuiPagination.show();
  } catch (err) {
    tuiPagination.hide();
    Notify.failure(err.message);
  } finally {
    loader.hide();
  }
}

async function loadMoreSearchingFilms(e) {
  const currentPage = e.page;
  try {
    loader.show();
    const { results } = await filmsApi.getFilmsByKeyword(currentPage);
    renderCards(results);
  } catch (err) {
    tuiPagination.hide();
    Notify.failure(err.message);
  } finally {
    loader.show();
  }
}

function renderCards(results) {
  const markup = createMarkup(results);
  refs.list.innerHTML = markup;
}
