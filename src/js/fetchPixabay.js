import axios from 'axios';
// axios.get('/users').then(res => {
//   console.log(res.data);
// });
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const per_page = 40;
export let page = 1;

export function fetchImage(q) {
  const searchParams = new URLSearchParams({
    key: '28350723-a2da361fc29768379678747a9',
    q,
    page,
    per_page,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return axios.get(`?${searchParams}`).then(response => {
    page += 1;
    return response.data;
  });
}

export function resetPage() {
  page = 1;
}
