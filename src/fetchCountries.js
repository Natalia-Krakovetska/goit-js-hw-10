import { Notify } from 'notiflix/build/notiflix-notify-aio';
const BASE_URL='https://restcountries.com/v2/name/';
export default function fetchCountries(name = "Ukraine"){
    return fetch(`${BASE_URL}${name}?fields=name,capital,population,flags,languages`).then(resp => {
        console.log(resp);
        if(!resp.ok){
            throw new Error(statusText);
          }
        return resp.json();
        }).catch(err => Notify.failure('Oops, there is no country with that name'))
        };
    