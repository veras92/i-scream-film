// import { FimlsApi } from './film-service';

// const filmsApi = new FimlsApi();

// export class CreateMarkup {
//   createHomepageCards(results) {
//     const markup = arrOfCards
//       .map(
//         ({
//           id,
//           poster_path: src,
//           title,
//           release_date: date,
//           vote_average: raiting,
//           genre_ids,
//         }) => {
//           return `
//       <li class="card" data-id="${id} >
//           <img class="card__img" src="https://image.tmdb.org/t/p/original/${src}" alt="${title}" data-source="{original}"  loading="lazy">
//           <h2 class="card__title">${title}</h2>
//           <p class="card__text">{Drama, Action} | ${date} <span>${raiting}</span></p>
//       </li>`;
//         }
//       )
//       .join('');

//     return markup;
//   }

//   createLibraryCards(results) {
//     const cardsByString = arrOfCards
//       .map(el => {
//         return `
//       <li class="card">
//         <a class="card__link" href="{original}" data-id="{1234}">
//           <img class="card__img" src="./images/logo.png" alt="{poster}" data-source="{original}"  loading="lazy">
//           <h2 class="card__title">{GREYHOUND}</h2>
//           <p class="card__text">{Drama, Action} | {2020}<span class="card__text_rating">{10.0}</span></p>
//         </a>
//       </li>`;
//       })
//       .join('');

//     return cardsByString;
//   }

//   createModalWindowInfo(info) {}
// }

// filmsApi.getTrendingFilms(1).then(console.log);

// adult: false;
// backdrop_path: '/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg';
// genre_ids: (3)[(28, 12, 878)];
// id: 505642;
// media_type: 'movie';
// original_language: 'en';
// original_title: 'Black Panther: Wakanda Forever';
// overview: 'Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death.  As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda.';
// popularity: 11167.095;
// poster_path: '/sv1xJUazXeYqALzczSZ3O6nkH75.jpg';
// release_date: '2022-11-09';
// title: 'Black Panther: Wakanda Forever';
// video: false;
// vote_average: 7.489;
// vote_count: 2659;
