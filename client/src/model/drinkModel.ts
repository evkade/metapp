export function drinkModel(menu) {

  function getCocktailBasedOnName(name) {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+name;
    const cocktails = apiCall(url).then(data => data);
    return cocktails;
  };

 function getBeerBasedOnName(name) {
    const url = 'https://systembevakningsagenten.se/api/json/2.1/searchStore.json?' + new URLSearchParams({
      query: name
    });
    const cannedBeverages = apiCall(url).then(data => data);
    return cannedBeverages;
  };
  
  async function apiCall(url) {
    return await fetch(url, {
        "method": "GET",
      })
    .then(response => response.json())
    .catch(error => console.error(error))
  };  

};