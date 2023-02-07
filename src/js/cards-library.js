export default function createCardsLibrary(arrOfCards) {
  const cardsByString = arrOfCards
    .map(el => {
      return `
      <li class="card">
        <a class="card__link" href="{original}" data-id="{1234}">
          <img class="card__img" src="./images/logo.png" alt="{poster}" data-source="{original}"  loading="lazy">
          <h2 class="card__title">{GREYHOUND}</h2>
          <p class="card__text">{Drama, Action} | {2020}<span class="card__text_rating">{10.0}</span></p>
        </a>
      </li>`;
    })
    .join('');

  return cardsByString;
}
