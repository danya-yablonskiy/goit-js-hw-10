import './css/styles.css';
import debounce from "lodash.debounce";
import {fetchCountries} from "./function/fetchCountries";
const DEBOUNCE_DELAY = 300;

const refs = {
    inputEl: document.querySelector('#search-box'),
    countryListEl: document.querySelector('.country-list'),
    counrtyInfoEl: document.querySelector('.country-info'),
};


const {inputEl, countryListEl, counrtyInfoEl} = refs;


inputEl.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(){
  const name = inputEl.value.trim();
  if(!name.trim()){
    return}
  fetchCountries(name);
}

function renderCountriesList(counrties){
  return counrties.map(({name, flags}) => {
    return `<li class='country-list__item'>
    <img class="country-list__flag" src="${flags.svg}" alt="${name.official}" width = 30px height = 30px>
    <h2 class="country-list__name">${name.official}</h2></li>`
  }).join('')
}

function renderCountriesInfo(counrties){
  return counrties.map(({capital, population, languages})=>{
return `<ul class='country-list-info'>
<li class='country-list-info__item'>Capital: ${capital}</li>
<li class='country-list-info__item'>Population: ${population}</li>
<li class='country-list-info__item'>Languages: ${Object.values(languages).join(', ')}</li>
</ul>`
  }).join('')
}

function inputChecking(counrties){
  if (counrties.length === 1) {
    countryListEl.insertAdjacentHTML('beforeend', renderCountriesList(counrties));
    counrtyInfoEl.insertAdjacentHTML('beforeend', renderCountriesInfo(counrties));
  } else if (counrties.length > 10) {
    Notify.info("Too many matches found. Please enter a more specific name.")
  }else if (counrties.length >= 2 && counrties.length <= 10) {
    countryListEl.insertAdjacentHTML('beforeend', renderCountriesList(counrties));
  }
}

function clearInput(){
    countryListEl.innerHTML = '';
    counrtyInfoEl.innerHTML = '';
  }

  