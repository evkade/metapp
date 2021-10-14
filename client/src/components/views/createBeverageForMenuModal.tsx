import { NewBeverageFormPresenter } from "../presenters/newBeverageFormPresenter";
import React, { useEffect, useState } from "react";
import { beverageTypes } from "../../constants/searchTypes";

// modal code inspired by https://medium.com/tinyso/how-to-create-a-modal-component-in-react-from-basic-to-advanced-a3357a2a716a

export const CreateBeverageForMenuModal = ({
  showModal, 
  setShowModal,
  menu,
  addToMenu,
  beverageType,
}) => {
  // todo : on click / submit of form : create a new beverage with these characteristics, add it to menu
  // todo: all beverages should be added to history when being added to menu
  // todo : change title based on what you are adding to menu 
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
            />
          </div>
          <div className="modal-footer">
            <button className="button"> Cancel </button>
            <button className="button"> OK </button>
          </div>
        </div>
      </div>
    </div>
  );
};
