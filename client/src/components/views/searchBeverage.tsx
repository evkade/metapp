import React from "react";
import { beverageTypes } from "../../constants/searchTypes";
// todo: lägga till en bättre loading
// todo: lägga till finns grej när searchResults är tom
// todo: fixa beer strängarna då man får konstiga tecknen tex: Abbaye D&#39;aulne Christmas Triple Ale

export const SearchBeverage = ({
  searchBeverage,
  searchResult,
  isLoading,
  addToMenu,
}) => {
  const [query, setQuery] = React.useState('');
  return (
    <div>
      <input id="searchQuery" value={query} onChange={(event) => setQuery(event.target.value)}></input>
      <button type="submit" onClick={() => searchBeverage(query)}>Search</button>
      {!isLoading && searchResult ? (
        searchResult.map((beverage) => (
          <div onClick={() => console.log(beverage.name)}>
            <div> {hashListToDiv(beverage)} </div> 
            <button type="submit" onClick={() => addToMenu(beverage)}>Add to menu </button>
            <br/>
          </div>
        ))
      ) : ( // todo fixa snygg loading + att den kommer upp på rätt tillfällen
        <div> Loading </div>
      )}
    </div>
  );
};

// temporary graphic solution for showing the beverages
const hashListToDiv = (hashList) => {
  var divList = [];
  for (var k in hashList) {
    const value = hashList[k];
    if (value === "ingredientList" || value === "ingredientMeasuresList") {
      // type of value is object
      divList = [...divList, <div>{hashListToDiv(value)}</div>];
    } else {
      divList = [...divList, <div>{k + ": " + value}</div>];
    }
  }
  return divList;
};
