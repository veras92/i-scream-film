import {
  getGenresList,
  getFullYear,
  getRaiting,
  converTitile,
} from './cardsInfoCoverter';

const BASE_SRC = 'https://image.tmdb.org/t/p/w500/';

export const createHomepageCards = results => {
  const markup = results
    .map(
      ({ id, poster_path, title, release_date, genre_ids, vote_average }) => {
        const year = getFullYear(release_date);
        const genresList = getGenresList(genre_ids);
        const raiting = getRaiting(vote_average);
        const convertedTitle = converTitile(title);
        return `
      <li class="card" data-id="${id}">
          <img class="card__img" src="${BASE_SRC}${poster_path}" alt="${title}" loading="lazy">
          <h2 class="card__title">${convertedTitle}</h2>
          <p class="card__text">${genresList} | ${year} <span class="card__text_rating">${raiting}</span></p>
      </li>`;
      }
    )
    .join('');

  return markup;
};
