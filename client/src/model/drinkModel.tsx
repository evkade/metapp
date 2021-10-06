export default class DrinkModel {

  // todo ev lägga till searchTypes / beverageobjects här ?

  setCocktailAPIResultToObject(result) : string[] {
    return result
  }

  getCocktailBasedOnName(name: string): Promise<any> {
    const cocktails = this.getFetch(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + name
    ).then((data) => data);
    return cocktails;
  }

  async getFetch(url: string) {
    return await fetch(url, {
      method: "GET",
    }).then((response) => response.json());
  }

  getBeerBasedOnName(name: string) {
    const beers = this.postFetch(
      "http://localhost:5000/api/beers", 
      {
        name: name,
      }
    ).then(data => data);
    return beers;
  }

  async postFetch(url: string, data) {
    return await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  }
}
