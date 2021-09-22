import axios from 'axios';

export const getCocktailBasedOnName = (name) => {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+name;
  const cocktails = apiCall(url).then(data => data);
  return cocktails;
};

async function apiCall(url) {
  return await fetch(url, {
      "method": "GET",
    })
  .then(response => response.json())
  .catch(error => console.error(error))
};