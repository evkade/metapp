import React from "react";

export const AddBeverageToMenu = ({searchBeverage, cocktailPromise, searchResult, searchError}) => {
  const [query, setQuery] = React.useState("");
  console.log(searchResult);

  return (
    <div>
      <input
        onChange={() => setQuery(event.target.value)}
      ></input>
      <button type="submit" onClick={() => searchBeverage(query)}>
        {" "}
        Search{" "}
      </button>
      <div>{searchResult ? searchResult.drinks.map(cocktail => <div key={cocktail.idDrink}>{cocktail.strDrink}</div>) : null}</div>
    </div>
  );
};
