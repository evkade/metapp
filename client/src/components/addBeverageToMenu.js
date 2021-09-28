import React from "react";

export const AddBeverageToMenu = ({searchBeverage, cocktailPromise, searchResult, searchError}) => {
  const [query, setQuery] = React.useState("");

  return (
    <div>
      <input
        onChange={() => setQuery(event.target.value)}
      ></input>
      <button type="submit" onClick={() => searchBeverage(query)}>
        {" "}
        Search{" "}
      </button>
      {searchResult ? searchResult.drinks.map(cocktail => <div>{cocktail.strDrink}</div>) : <div> Loading </div>}
    </div>
  );
};
