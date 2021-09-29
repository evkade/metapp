export default class DrinkModel {

  getCocktailBasedOnName(name): Promise<any> {
    const cocktails = this.apiCall("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+name)
      .then(data => data);
    return cocktails;
  };

  getBeerBasedOnName(name) {
    const beers = this.apiCall(
      'https://systembevakningsagenten.se/api/json/2.1/searchStore.json?' + 
      new URLSearchParams({
        query: name
      }))
        .then(data => data);
    return beers;
  };
  
  async apiCall(url) {
    return await fetch(url, {
        "method": "GET",
      })
    .then(response => response.json())
  };  

};
