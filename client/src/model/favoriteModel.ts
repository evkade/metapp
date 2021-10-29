
import { setFavorites, addFavorite, removeFavorite } from "../redux/actions/user";

export default class FavoriteModel {
    getFavorites() {
        return (dispatch) => {
            fetch(`http://localhost:5000/api/favorite`, {
                credentials: "include",
            })
                .then((data) => data.json())
                .then((favorites) => dispatch(setFavorites(favorites)))
                .catch((err) => console.log(err));
        };
    }

    async postBeverageToDatabase(object: { beverage: String, type: String, bar: String }) {
        const beerObjectForAPI = {
            "name": object.beverage,
            "beverage_type": object.type,
            "bar": object.bar
        };
        const response = await fetch(
            "http://localhost:5000/api/favorite",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(beerObjectForAPI),
                credentials: "include",
            }
        )
        response.json().then((data) => {
            return data.favorites
        }).catch(err => console.error(err));

    }


    async removeBeveragefromDatabase(object: { beverage_id: String, type: String, bar: String }) {
        const beerObjectForAPI = {
            "beverage_id": object.beverage_id,
            "beverage_type": object.type,
            "bar": object.bar
        };

        const response = await fetch(
            "http://localhost:5000/api/favorite",
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(beerObjectForAPI),
                credentials: "include",
            }
        )

        response.json().then((data) => {
            // dispatch(removeFavorite(data.favorites));
            return data.favorites
        }).catch(err => console.error(err));


    }


}
