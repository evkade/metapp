import { NewBeverageFormPresenter } from "../presenters/newBeverageFormPresenter";
import React, { useState } from "react";
import { beverageTypes } from "../../constants/searchTypes";
import { Beer, Cocktail } from "../../constants/beverageObjects";

// modal code inspired by https://medium.com/tinyso/how-to-create-a-modal-component-in-react-from-basic-to-advanced-a3357a2a716a

export const CreateBeverageForMenuModal = ({
  showModal, 
  setShowModal,
  menu,
  addToMenu,
  beverageType,
  onAddToMenu,
  newBeverage,
  setNewBeverage
}) => {
  // todo: on click / submit of form : create a new beverage with these characteristics, add it to menu
  // todo: all beverages should be added to history when being added to menu
  // todo: change title based on what you are adding to menu
  // todo: fill this new beverage with fields from the clicked beverage 
  // so maybe this has to be made in file before in structure
  
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title"> Add to menu </h4>
          <div className="modal-body">
            <NewBeverageFormPresenter
              menu={menu}
              addToMenu={addToMenu}
              customizedType={beverageType}
              newBeverage={newBeverage}
              setNewBeverage={setNewBeverage}
            />
          </div>
          <div className="modal-footer">
            <button className="button" onClick={() => setShowModal(false)}> Cancel </button>
            <button className="button" onClick={() => onAddToMenu(newBeverage)}> OK </button>
          </div>
        </div>
      </div>
    </div>
  );
};

