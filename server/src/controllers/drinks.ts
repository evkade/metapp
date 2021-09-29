const axios = require('axios');

export async function getDrinks() {
    return await axios.get('https://systembevakningsagenten.se/api/json/2.0/newProducts.json?')
        .then(data => data.data)
        .catch(error => {
            if (error) console.log(error);
        })
}

