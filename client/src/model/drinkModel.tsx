export default class DrinkModel {

  getCocktailBasedOnName(name): Promise<any> {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+name;
    const cocktails = this.apiCall(url).then(data => data);
    return cocktails;
  };

  getBeerBasedOnName(name) {
    const url = 'https://systembevakningsagenten.se/api/json/2.1/searchStore.json?' + new URLSearchParams({
      query: name
    });
    const cannedBeverages = this.apiCall(url).then(data => data);
    return cannedBeverages;
  };
  
  async apiCall(url) {
    return await fetch(url, {
        "method": "GET",
      })
    .then(response => response.json())
    .catch(error => console.error(error))
  };  

};

