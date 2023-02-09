import { genres } from './genres.json';

export const getSrc = poster_path => {
  const BASE_SRC = 'https://image.tmdb.org/t/p/w500';
  if (!poster_path) {
    return 'https://ik.imagekit.io/blsadqwgu/comingSoon.webp';
  }
  return `${BASE_SRC}${poster_path}`;
};

export const converTittle = title => {
  const titleLength = title.length;
  if (titleLength <= 34) {
    return title;
  }
  const start = title.slice(0, 14);
  const end = title.slice(-14);
  return `${start}...${end}`;
};

export const getFullYear = release_date => {
  const date = new Date(release_date);
  return date.getFullYear();
};

export const getGenresList = genre_ids => {
  const genresArr = genre_ids.map(genreId => {
    const [{ name }] = genres.filter(({ id }) => id === genreId);
    return name;
  });

  if (genresArr.length <= 2) {
    return genresArr.join(' ');
  }

  const genresText = genresArr.slice(0, 2).join(', ');
  return `${genresText}, Other`;
};

export const getRaiting = vote_average => {
  return vote_average.toFixed(1);
};
