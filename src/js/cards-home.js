import {
  getGenresListById,
  getFullYear,
  converTittle,
  getSrc,
} from './cardsInfoCoverter';

export const createHomepageCards = results => {
  const markup = results
    .map(({ id, poster_path, title, release_date, genre_ids }) => {
      const year = getFullYear(release_date);
      const genresList = getGenresListById(genre_ids);
      const convertedTitle = converTittle(title);
      const src = getSrc(poster_path);
      return `
      <li class="card" data-id="${id}">
      <a href="">
          <img class="card__img" src="${src}" alt="${title}" loading="lazy" />
          <h2 class="card__title">${convertedTitle}</h2>
          <p class="card__text">${genresList} | ${year}</p>
          </a>
      </li>`;
    })
    .join('');

  return markup;
};
