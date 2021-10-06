const axios = require('axios');

export async function getBeers(name) {
    return await axios.get('https://systembevakningsagenten.se/api/json/2.1/searchProduct.json?query=' + name)
        .then(data => data.data)
        // @ts-ignore
        .catch(error => {
            if (error) console.log(error);
        })
}
