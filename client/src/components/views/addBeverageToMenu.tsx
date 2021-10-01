import React from "react";

// todo: lägga till en bättre loading 
export const AddBeverageToMenu = ({searchBeverage, searchResult, isLoading}) => {
  const [query, setQuery] = React.useState("");
  console.log(searchResult);

  return (
    <div>
      <input
        onChange={(event) => setQuery(event.target.value)}
      ></input>
      <button type="submit" onClick={() => searchBeverage(query)}>
        {" "}
        Search{" "}
      </button>
      {!isLoading && searchResult ? searchResult.map(beverage => <div key={beverage} >{beverage}</div>) : <div> Loading </div>}
    </div>
  );
};
