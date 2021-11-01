const axios = require("axios");

export async function getAPIBeers(name: string) {
  return await axios
    .get(
      "https://systembevakningsagenten.se/api/json/2.1/searchProduct.json?query=" +
        name
    )
    .then((data: any) => data.data)
    .catch((error: Error) => console.log(error));
}
