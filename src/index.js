import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const boxCountryInfo = document.querySelector('.country-info');
const listCountries = document.querySelector('.country-list');
inputEl.addEventListener("input", debounce(onSearch, DEBOUNCE_DELAY));



function onSearch(evt){
    evt.preventDefault();
    const searchCountry= evt.target.value.trim();
    console.log(searchCountry);
   
if(!searchCountry){
    Notify.failure('Oops, there is no country with that name');  
    clearMarkUp();
    return;
}; 

fetchCountries(searchCountry).then(data => { if(data.length === 1){
    createMarkup(data);
    clearSmallMarkUp();
}    
    else if(data.length > 10){
    Notify.info('Too many matches found. Please enter a more specific name.');
    clearSmallMarkUp();
    } 
    else if(data.length > 1 && data.length <= 10){
    createSmallMarkup(data);
    clearMarkUp();
    } else if(!data.length){
        Notify.failure('Oops, the field is not filled');
    }
    }
)};




function createMarkup(arr) { 
const markup = arr.map((item => `<ul class="country-info--list">
<li class="country-info--item"><h1 class="country-info--header"><img src="${item.flags.svg}" alt="countries flag" class="country-info--img" width = "60"> ${item.name}</h1></li>
<li class="country-info--item"><span class="country-info--text">Capital: ${item.capital}</span></li>
<li class="country-info--item"><span class="country-info--text">Population: ${item.population}</span></li>

<li class="country-info--item"><span class="country-info--text">Languages: ${item.languages.map((language => language.name)).join(', ')}</span></li>
</ul>`)).join('');
boxCountryInfo.innerHTML = markup;
};




function createSmallMarkup(arr) {
    const smallMarkup = arr.map((item => `<ul class="country-small--list">
    <li class="country-small--item"><span class="country-infoSmall--text"><img src="${item.flags.svg}" alt="countries flag" class="country-info--img" width = "30"> ${item.name}</span></li>
   </ul>`)).join('');
    listCountries.innerHTML = smallMarkup;
};



function clearMarkUp(){
    boxCountryInfo.innerHTML = "";
};


function clearSmallMarkUp(){
    listCountries.innerHTML = "";
};