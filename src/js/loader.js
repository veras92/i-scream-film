import { refs } from './refs';

export const showLoader = () => refs.loader.classList.remove('is-hidden');
export const hideLoader = () => refs.loader.classList.add('is-hidden');
