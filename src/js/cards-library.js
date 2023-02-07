export default function createCardsLibrary(arrOfCards) {
  const cardsByString = arrOfCards
    .map(el => {
      return `
      <li class="card">
        <img class="card__img" src="{./img/Rectangle 5.jpg}" alt="{poster}" loading="lazy">
        <h2 class="card__title">{GREYHOUND}</h2>
        <p class="card__text">{Drama, Action} | {2020}<span class="card__text_rating">{10.0}</span></p>
      </li>`;
    })
    .join('');

  return cardsByString;
}
