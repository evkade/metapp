import React from "react";
import { beverageCardTypes } from "../../constants/beverageCardType";
import { NewBeverageFormPresenter } from "../presenters/newBeverageFormPresenter";

// modal code inspired by https://medium.com/tinyso/how-to-create-a-modal-component-in-react-from-basic-to-advanced-a3357a2a716a

export const CreateBeverageForMenuModal = ({
  beverageType,
  onAddToMenu,
  onEditInMenu,
  onCancel,
  newBeverage,
  setNewBeverage,
  beverageCardType,
  modalTitle,
}) => {
  // todo: change modal title based on what you are adding to menu

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">{modalTitle}</h4>
        </div>
        <div>
          <NewBeverageFormPresenter
            customizedType={beverageType}
            newBeverage={newBeverage}
            setNewBeverage={setNewBeverage}
          />
        </div>
        <div className="modal-footer">
          <button className="button" onClick={() => onCancel()}>
            Cancel
          </button>
          <button
            className="button"
            onClick={
              beverageCardType === beverageCardTypes.ADMIN_MENU
                ? () => onEditInMenu(newBeverage)
                : () => onAddToMenu(newBeverage)
            }
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
