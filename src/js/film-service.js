import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export class FimlsApi {
  #query = '';
  #api_key = 'f68110fe6010762197ab45abbadc1a08';

  async getTrendingFilms(page) {
    const { data } = await axios.get('/trending/movie/day', {
      params: {
        api_key: this.#api_key,
        page,
      },
    });

    return data;
  }

  async getFilmsByKeyword(page) {
    const { data } = await axios.get('/search/movie', {
      params: {
        api_key: this.#api_key,
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
        api_key: this.#api_key,
      },
    });

    return data;
  }

  async getFilmTrailer(movie_id) {
    const { data } = await axios.get(`/movie/${movie_id}/videos`, {
      params: {
        api_key: this.#api_key,
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
// filmsApi.getFilmById(id).then(console.log);
