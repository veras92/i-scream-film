import {
  getGenresListFromArr,
  getFullYear,
  getRaiting,
  converTittle,
  getSrc,
} from './cardsInfoCoverter';

export const createHomepageCards = results => {
  const markup = results
    .map(({ id, poster_path, title, release_date, genres, vote_average }) => {
      const src = getSrc(poster_path);
      const convertedTitle = converTittle(title);
      const year = getFullYear(release_date);
      const genresList = getGenresListFromArr(genres);
      const raiting = getRaiting(vote_average);
      return `
      <li class="card" data-id="${id}">
          <img class="card__img" src="${src}" alt="${title}" loading="lazy" />
          <h2 class="card__title">${convertedTitle}</h2>
          <p class="card__text">${genresList} | ${year} <span class="card__text_rating">${raiting}</span></p>
      </li>`;
    })
    .join('');

  return markup;
};
