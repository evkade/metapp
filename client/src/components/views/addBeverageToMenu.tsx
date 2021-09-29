import React from "react";

export const AddBeverageToMenu = ({searchBeverage, searchResult }) => {
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
      {searchResult ? searchResult.map(beverage => <div>{beverage}</div>) : <div> Loading </div>}
    </div>
  );
};
