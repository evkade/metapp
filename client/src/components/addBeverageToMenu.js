import React from "react";

<<<<<<< HEAD
export const AddBeverageToMenu = ({searchBeverage, cocktailPromise, searchResult, searchError}) => {
  const [query, setQuery] = React.useState("");
  console.log(searchResult);

=======
export const AddBeverageToMenu = ({searchBeverage, searchResult}) => {
  const [query, setQuery] = React.useState("");
  console.log(searchResult);

  // todo byta loading
>>>>>>> 6350ac7 (add working cocktailDB API call, and basic search page)
  return (
    <div>
      <input
        onChange={() => setQuery(event.target.value)}
      ></input>
      <button type="submit" onClick={() => searchBeverage(query)}>
        {" "}
        Search{" "}
      </button>
<<<<<<< HEAD
      {searchResult ? searchResult.drinks.map(cocktail => <div key={cocktail.idDrink}>{cocktail.strDrink}</div>) : <div> Loading </div>}
=======
      {searchResult ? searchResult.drinks.map(cocktail => <div>{cocktail.strDrink}</div>) : <div> Loading </div>}
>>>>>>> 6350ac7 (add working cocktailDB API call, and basic search page)
    </div>
  );
};
