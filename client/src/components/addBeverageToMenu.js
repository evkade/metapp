import React from "react";

export const AddBeverageToMenu = ({searchBeverage, cocktailPromise, searchResult, searchError}) => {
  const [query, setQuery] = React.useState("");
  console.log(searchResult);

  const resultsView = () => {
    if(!cocktailPromise) return null;
    else if(searchError) return 'Error';
    else if(!searchResult) return 'Loading';
    else return <div>{searchResult.drinks.map(cocktail => <div key={cocktail.idDrink}>{cocktail.strDrink}</div>)}</div>;
  };

  React.useEffect(() => {
    const resultsView = () => {
      if(!cocktailPromise) return null;
      else if(searchError) return 'Error';
      else if(!searchResult) return 'Loading';
      else return <div>{searchResult.drinks.map(cocktail => <div key={cocktail.idDrink}>{cocktail.strDrink}</div>)}</div>;
    }
    [cocktailPromise, searchError, searchResult]
  );


  return (
    <div>
      <input
        onChange={() => setQuery(event.target.value)}
      ></input>
      <button type="submit" onClick={() => searchBeverage(query)}>
        {" "}
        Search{" "}
      </button>
      {resultsView}
    </div>
  );
};
