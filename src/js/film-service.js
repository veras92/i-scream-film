import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const API_KEY = 'f68110fe6010762197ab45abbadc1a08';

export class FimlsApi {
  #query = 'key';

  async getTrendingFilms(page) {
    const { data } = await axios.get('/trending/all/day', {
      params: {
        api_key: API_KEY,
        page,
      },
    });

    return data;
  }

  async getFilmsByKeyword(page) {
    const { data } = await axios.get('/search/movie', {
      params: {
        api_key: API_KEY,
        query: this.#query,
        page,
        include_adult: false,
      },
    });

    return data;
  }

  async getFilmById(movie_id) {
    const { data } = await axios.get(`/movie/${movie_id}`, {
      params: {
        api_key: API_KEY,
      },
    });

    return data;
  }

  async getFilmTrailer(movie_id) {
    const { data } = await axios.get(`/movie/${movie_id}/videos`, {
      params: {
        api_key: API_KEY,
      },
    });

    return data;
  }

  get query() {
    return this.#query;
  }

  set query(newQuery) {
    this.#query = newQuery;
  }
}

// how to use:

// import { FimlsApi } from './film-service';

// const filmsApi = new FimlsApi();

// filmsApi.getTrendingFilms(1).then(console.log);

// filmsApi.query = searchValue;
// filmsApi.getFilmsByKeyword(1).then(console.log);

// filmsApi.getFilmById(406563).then(console.log);

// filmsApi.getFilmTrailer(406563).then(console.log);

//backend info:

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
