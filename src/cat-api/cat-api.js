import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'DEMO-API-KEY';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';

export default class CatAPIService {
  constructor() {}
  fetchBreeds() {
    return axios('breeds')
      .then(res => res.data)
      .catch(() =>
        Notify.failure('Oops! Something went wrong! Try reloading the page!')
      );
  }
  fetchCatByBreed(breedId) {
    return axios(`images/search?breed_ids=${breedId}`)
      .then(res => res.data)
      .catch(() =>
        Notify.failure('Oops! Something went wrong! Try reloading the page!')
      )
  }
}
