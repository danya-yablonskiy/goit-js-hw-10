import { Notify } from 'notiflix/build/notiflix-notify-aio';
export function fetchCountries(name){
   return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
   .then(response => {
     if (!response.ok) {
       throw new Error();
   }
     return response.json();
     
   })
   .then(counrties => {
     clearInput();
     inputChecking(counrties)
   })
   .catch(() => {
     Notify.failure("Oops, there is no country with that name");
     clearInput();
   })
   }