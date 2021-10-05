export default class DrinkModel {

  getCocktailBasedOnName(name): Promise<any> {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+name;
    const cocktails = this.apiCall(url).then(data => data);
    return cocktails;
  };
  
  async apiCall(url) {
    return await fetch(url, {
        "method": "GET",
      })
    .then(response => response.json())
    .catch(error => console.error(error))
  };  

};

