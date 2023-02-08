export const createLibraryCards = results => {
  const markup = results
    .map(el => {
      return `
      <li class="card" data-id="{1234}">
          <img class="card__img" src="./images/logo.png" alt="{poster}" data-source="{original}"  loading="lazy">
          <h2 class="card__title">{GREYHOUND}</h2>
          <p class="card__text">{Drama, Action} | {2020}<span class="card__text_rating">{10.0}</span></p>
      </li>`;
    })
    .join('');

  return markup;
};
