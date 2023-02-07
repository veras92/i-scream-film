export default function createCards(arrOfCards) {
  const cardsByString = arrOfCards
    .map(el => {
      return `
      <li class="card">
        <img class="card__img" src="{./img/Rectangle 5.jpg}" alt="{poster}" loading="lazy">
        <h2 class="card__title">{GREYHOUND}</h2>
        <p class="card__text">{Drama, Action} | {2020}</p>
      </li>`;
    })
    .join('');

  return cardsByString;
}
