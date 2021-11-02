import {
  setFavorites,
  addFavorite,
  removeFavorite,
} from "../redux/actions/user";

export default class FavoriteModel {
  getFavorites() {
    return (dispatch) => {
      fetch(`http://localhost:5000/api/favorite`, {
        credentials: "include",
      })
        .then((data) => {
          if (data.ok) return data.json();
          else throw new Error("Could not get favorites");
        })
        .then((favorites) => dispatch(setFavorites(favorites)))
        .catch((err) => window.alert(err.message));
    };
  }

  async postBeverageToDatabase(object: {
    beverage: String;
    type: String;
    bar: String;
  }) {
    const beerObjectForAPI = {
      name: object.beverage,
      beverage_type: object.type,
      bar: object.bar,
    };
    const response = await fetch("http://localhost:5000/api/favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(beerObjectForAPI),
      credentials: "include",
    });
    return response
      .json()
      .then((data) => {
        return data;
      })
      .catch((err) => window.alert(err.message));
  }

  async removeBeveragefromDatabase(object: {
    beverage_id: String;
    type: String;
    bar: String;
  }) {
    const beerObjectForAPI = {
      beverage_id: object.beverage_id,
      beverage_type: object.type,
      bar: object.bar,
    };

    const response = await fetch("http://localhost:5000/api/favorite", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(beerObjectForAPI),
      credentials: "include",
    });

    response
      .json()
      .then((data) => {
        // dispatch(removeFavorite(data.favorites));
        return data.favorites;
      })
      .catch((err) => window.alert(err.message));
  }
}
