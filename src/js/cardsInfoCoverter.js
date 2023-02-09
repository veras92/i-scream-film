import { genres } from './genres.json';

export const getSrc = poster_path => {
  const BASE_SRC = 'https://image.tmdb.org/t/p/w500';
  const FALLBACK_SRC = 'https://ik.imagekit.io/blsadqwgu/comingSoon.webp';
  if (!poster_path) return FALLBACK_SRC;
  return `${BASE_SRC}${poster_path}`;
};

export const converTittle = title => {
  if (title.length <= 34) return title;
  const start = title.slice(0, 14);
  const end = title.slice(-14);
  return `${start}...${end}`;
};

export const getFullYear = release_date => {
  const date = new Date(release_date || new Date());
  return date.getFullYear();
};

export const getGenresListFromArr = genres => {
  const genresArr = genres.map(genre => genre.name);
  if (genresArr.length <= 2) return genresArr.join(' ');
  return `${genresArr.slice(0, 2).join(', ')}, Other`;
};

export const getGenresListById = genre_ids => {
  const genresArr = genre_ids.map(genreId => {
    const [{ name }] = genres.filter(({ id }) => id === genreId);
    return name;
  });
  if (genresArr.length <= 2) return genresArr.join(' ');
  return `${genresArr.slice(0, 2).join(', ')}, Other`;
};

export const getRaiting = vote_average =>
  !vote_average ? '0.0' : vote_average.toFixed(1);
