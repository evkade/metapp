import React from "react";
import AdminMenuPresenter from "../presenters/adminMenuPresenter";
import CreateBeverageForMenuModalPresenter from "../presenters/createBeverageForMenuModalPresenter";
import { Beverage } from "../../constants/beverageObjects";
import { beverageTypes } from "../../constants/searchTypes";
import SearchBeveragePresenter from "../presenters/searchBeveragePresenter";

const CustomizeMenu = ({
  showModal,
  setShowModal,
  modalBeverage,
  setModalBeverage,
  history,
  menu,
  addToMenu,
  removeFromMenu,
  editInMenu,
  customizedType,
  setCustomizedType,
  currentSearchType,
  setCurrentSearchType,
  beverageCardType,
  setBeverageCardType,
  loading,
  spinner,
}) => {
  return (
    <div className="admin-menu-container">
      {loading ? (
        spinner
      ) : (
        <>
          <div className="title-neon--small">Customize menu</div>
          <div className="admin-menu-container__tabs">
            <button
              className="admin-menu-container__tab"
              type="submit"
              onClick={() => setCustomizedType(beverageTypes.BEER)}
              disabled={customizedType === beverageTypes.BEER}
            >
              Beer
            </button>
            <button
              className="admin-menu-container__tab"
              type="submit"
              onClick={() => setCustomizedType(beverageTypes.COCKTAIL)}
              disabled={customizedType === beverageTypes.COCKTAIL}
            >
              Cocktail
            </button>
          </div>
          <div className="admin-menu-container__row">
            <div className="admin-menu-container__column admin-menu-container__column--flex">
              <AdminMenuPresenter
                setShowModal={setShowModal}
                setModalBeverage={setModalBeverage}
                menu={menu}
                removeFromMenu={removeFromMenu}
                editInMenu={editInMenu}
                customizedType={customizedType}
                setBeverageCardType={setBeverageCardType}
              />
            </div>
            <div className="admin-menu-container__column">
              <SearchBeveragePresenter
                setShowModal={setShowModal}
                setModalBeverage={setModalBeverage}
                menu={menu}
                history={history}
                customizedType={customizedType}
                currentSearchType={currentSearchType}
                setCurrentSearchType={setCurrentSearchType}
                setBeverageCardType={setBeverageCardType}
                spinner={spinner}
              />
            </div>
            <CreateBeverageForMenuModalPresenter
              showModal={showModal}
              setShowModal={setShowModal}
              modalBeverage={modalBeverage}
              setModalBeverage={setModalBeverage}
              menu={menu}
              addToMenu={addToMenu}
              editInMenu={editInMenu}
              customizedType={customizedType}
              currentSearchType={currentSearchType}
              setCurrentSearchType={setCurrentSearchType}
              beverageCardType={beverageCardType}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CustomizeMenu;
