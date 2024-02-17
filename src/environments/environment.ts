export const URL_API = 'https://api.themoviedb.org/3/';
export const TOKEN_API = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmMwMWQxZGJhNTM4OWJjZjI5MDUzMzc0ZWNiZDUxZCIsInN1YiI6IjY1Yzc1MGUyNTRhMDk4MDE4NDAxOWJkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UPpDboS8MDXxdvnDizQXZ_IiHAc72Ekvi65X9nAhifc';

export const URL_BASE_SGI = 'http://143.47.38.72/';
export const URL_API_SGI = `${URL_BASE_SGI}/api/private`;

export const API_HEADERS = {
  headers: {
    Authorization: `Bearer ${TOKEN_API}`,
    accept: 'application/json',
  },
};
