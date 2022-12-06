import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const BASE_URL='https://restcountries.com/v2/name/';
const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const boxCountryInfo = document.querySelector('.country-info')
console.log(boxCountryInfo);
inputEl.addEventListener("input", debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt){
    evt.preventDefault();
    const searchCountry= evt.target.value.trim();
    console.log(searchCountry);
   
if(!searchCountry){
     alert("Поле пусте");  
    return;
} else if(searchCountry > 10){
    Notiflix.Notify.warning('Oops, there is no country with that name');
} else if(searchCountry > 2 ||searchCountry < 10) {
    alert('нормас');
}
fetchCountries(searchCountry).then(data =>{ if(data.length > 10){
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')}
    else if(data.length >= 2 && data.length <= 10){
    alert("GGGGGG");
    createSmallMarkup(data);
    } 
    else if(data.length === 1){
        createMarkup(data);
    }
    })};



function fetchCountries(name = "Ukraine"){
return fetch(`${BASE_URL}${name}?fields=name,capital,population,flags,languages`).then(resp => {
    console.log(resp);
    if(!resp.ok){
        throw new Error('Oops, there is no country with that name');
       
    }
    return resp.json();
    }).catch(err => console.error(err))
    };


function createMarkup(arr) { 
const markup = arr.map((item => `<ul class="country-info--list">
<li class="country-info--item"><span class="country-info--text">Country: <img src="${item.flags.svg}" alt="countries flag" class="country-info--img" width = "20">' ${item.name}'</span></li>
<li class="country-info--item"><span class="country-info--text">Capital: '${item.capital}'</span></li>
<li class="country-info--item"><span class="country-info--text">Population: '${item.population}'</span></li>

<li class="country-info--item"><span class="country-info--text">${item.languages.map((language => language.name)).join(', ')}</span></li>
</ul>`)).join('');
boxCountryInfo.innerHTML = markup;
};
function createSmallMarkup(arr) {
    const smallMarkup = arr.map(item => console.log(smallMarkup))};
