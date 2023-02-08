import { getGenresList } from './getGenres';
const BASE_SRC = 'https://image.tmdb.org/t/p/original/';

export const createHomepageCards = results => {
  const markup = results
    .map(({ id, poster_path, title, release_date, genre_ids }) => {
      const date = new Date(release_date);
      const fullYear = date.getFullYear();
      const genresList = getGenresList(genre_ids);
      return `
      <li class="card" data-id="${id}">
          <img class="card__img" src="${BASE_SRC}${poster_path}" alt="${title}" loading="lazy">
          <h2 class="card__title">${title}</h2>
          <p class="card__text">${genresList} | ${fullYear}</p>
      </li>`;
    })
    .join('');

  return markup;
};

// // TO DO
// // falback for pictures
