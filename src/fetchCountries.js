import { Notify } from 'notiflix/build/notiflix-notify-aio';
export function fetchCountries(name){
    fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
   .then(response => {
     if (!response.ok) {
       throw new Error();
   }
     return response.json();
     
   })
   .then(counrties => {
     clearInput()
       if (counrties.length === 1) {
         countryListEl.insertAdjacentHTML('beforeend', renderCountriesList(counrties));
         counrtyInfoEl.insertAdjacentHTML('beforeend', renderCountriesInfo(counrties));
       } else if (counrties.length > 10) {
         Notify.info("Too many matches found. Please enter a more specific name.")
       }else if (counrties.length >= 2 && counrties.length <= 10) {
         countryListEl.insertAdjacentHTML('beforeend', renderCountriesList(counrties));
       }
   })
   .catch(() => {
     Notify.failure("Oops, there is no country with that name");
     clearInput();
   })
   }
