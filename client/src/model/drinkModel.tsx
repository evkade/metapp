export default class DrinkModel {

  // todo ev lägga till searchTypes här ist

  getCocktailBasedOnName(name): Promise<any> {
    const cocktails = this.getFetch(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + name
    ).then((data) => data);
    return cocktails;
  }

  getBeerBasedOnName(name) {
    const beers = this.postFetch(
      "http://localhost:5000/api/beers", 
      {
        name: name,
      }
    ).then(data => data);
    return beers;
  }

  async getFetch(url) {
    return await fetch(url, {
      method: "GET",
    }).then((response) => response.json());
  }

  async postFetch(url, data) {
    return await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  }
}
