import React from "react";
import { searchTypes } from "../../constants/searchTypes";
import { Beverage } from "../../constants/beverageObjects";
import BeverageCard from "./beverageCard";
import { beverageCardTypes } from "../../constants/beverageCardType";

export const SearchBeverage = ({
  searchBeverage,
  searchResult,
  isLoading,
  menu,
  setCurrentSearchType,
  spinner,
  query,
  setQuery,
  openModal,
  openNewBeverageModal,
  setShowInfoPopup,
  messageEmptyResults,
}) => {
  return (
    <>
      <input
        id="searchQuery"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      ></input>
      <select
        name="searchType"
        id="searchType"
        onChange={(e) => setCurrentSearchType(e.target.value)}
      >
        <option
          value={searchTypes.API}
          onClick={() => setCurrentSearchType(searchTypes.API)}
        >
          Search new
        </option>
        <option
          value={searchTypes.HISTORY}
          onClick={() => setCurrentSearchType(searchTypes.HISTORY)}
        >
          Find in history
        </option>
      </select>
      <button
        type="submit"
        onClick={() => searchBeverage(query)}
        className="general-button--bw general-button--black"
      >
        Search
      </button>
      <button
        type="submit"
        onClick={() => openNewBeverageModal(query)}
        className="general-button--bw general-button--black"
      >
        Create
      </button>
      <div className="beverage-list__container--grey beverage-list__container--grey-full">
        {!isLoading && searchResult.length > 0 ? (
          searchResult.map((beverage: Beverage, index: number) => (
            <BeverageCard
              key={index}
              beverageCardType={beverageCardTypes.ADMIN_SEARCH_RESULTS}
              beverage={beverage}
              index={index}
              addToOrder={null}
              removeFromOrder={null}
              count={null}
              openModal={() => openModal(beverage)}
              menu={menu}
              removeFromMenu={null}
              editInMenu={null}
            />
          ))
        ) : isLoading ? (
          spinner
        ) : (
          <h2 className="admin-menu-container__empty-message">
            {messageEmptyResults}
          </h2>
        )}
      </div>
      <button
        className="admin-menu-container__button--info general-button--bw general-button--black"
        onMouseEnter={() => setShowInfoPopup(true)}
        onMouseLeave={() => setShowInfoPopup(false)}
      >
        ?
      </button>
    </>
  );
};
