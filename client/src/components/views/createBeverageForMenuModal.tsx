import { NewBeverageFormPresenter } from "../presenters/newBeverageFormPresenter";
import React from "react";

// modal code inspired by https://medium.com/tinyso/how-to-create-a-modal-component-in-react-from-basic-to-advanced-a3357a2a716a

export const CreateBeverageForMenuModal = ({
  menu,
  addToMenu,
  beverageType,
  onAddToMenu,
  onCancel,
  newBeverage,
  setNewBeverage
}) => {
  // todo: change modal title based on what you are adding to menu
  
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
            <button className="button" onClick={() => onCancel()}> Cancel </button>
            <button className="button" onClick={() => onAddToMenu(newBeverage)}> OK </button>
          </div>
        </div>
      </div>
    </div>
  );
};
