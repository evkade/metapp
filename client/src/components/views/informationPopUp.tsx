import React from "react";

export const InformationPopUp = () => {
  return (
    <div className="admin-menu-container__pop-up">
      <h4>Customize your menu!</h4>
      <p>
        {" "}
        In the left view, choose if you want to customize the Beer or Cocktail
        part of your menu.{" "}
      </p>
      <p>
        {" "}
        In the right view, choose if you want to 'Search New', which gets new
        beverages from external APIs, or 'Find in history', where you can find
        all beverages that you have ever added to your menu. With 'Create', you
        can make a whole new beverage.{" "}
      </p>
    </div>
  );
};
