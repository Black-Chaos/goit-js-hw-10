import { Loading } from 'notiflix/build/notiflix-loading-aio';
import CatAPIService from './cat-api/cat-api';


const CatAPI = new CatAPIService();

const catInfo = document.querySelector('.cat-info')
const select = document.querySelector('.breed-select');

select.addEventListener('change', onChange);

function createSelectOptions() {
    return CatAPI.fetchBreeds()
    //   .then(console.log)
      .then(data =>
        data.map(({ id, name }) => {
          const option = document.createElement('option');
          option.value = id;
          option.textContent = name;
          return option;
        })
      );
}
createSelectOptions().then(options => {
    select.append(...options)
})

function onChange() {
    Loading.circle();
    CatAPI.fetchCatByBreed(select.value)
        .then(data => {
            renderCatInfo({
                img: data[0].url,
                name: data[0].breeds[0].name,
                desc: data[0].breeds[0].description,
                temp: data[0].breeds[0].temperament,
            })
      })
      .finally(Loading.remove);
}

function renderCatInfo({img, name, desc, temp}) {
    catInfo.innerHTML = `<img src="${img}" alt="cat" width="600">
      <h2>${name}</h2>
      <p>${desc}</p>
      <p>${temp}</p>`;
}