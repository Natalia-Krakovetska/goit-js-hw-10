import './css/styles.css';
import debounce from 'lodash.debounce';
console.log(debounce);

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
inputEl.addEventListener("input", onSearch);

function onSearch(evt){
    evt.preventDefault();
    const saerchCountry= evt.target.value.trim();
    console.log(saerchCountry);
if(!saerchCountry){
    alert("Поле пусте");
    return;
}
fetchCountries(saerchCountry).then(data => console.log(data))
}

function fetchCountries(name){
const BASE_URL='https://restcountries.com/v2/name/';
return fetch('${BASE_URL}${name}?fields=name,capital,population,flags,languages').then(resp => {   
    if(!resp.ok){
    throw new Error(resp.statusText);
    }
    return resp.json()
    }).catch(err => console.error(err));
    }
