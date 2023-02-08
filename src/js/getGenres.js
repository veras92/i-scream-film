import { genres } from './genres.json';
import { genres } from './genres.json';

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
