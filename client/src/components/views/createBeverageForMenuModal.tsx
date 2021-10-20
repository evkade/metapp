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
      <div className="modal__content">
        <div className="modal__headfoot">
          <h4 className="modal__title">{modalTitle}</h4>
          <div className="modal__body">
            <NewBeverageFormPresenter
              customizedType={beverageType}
              newBeverage={newBeverage}
              setNewBeverage={setNewBeverage}
            />
          </div>
          <div className="modal__headfoot">
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
    </div>
  );
};
