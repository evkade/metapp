import React from "react";
import { Card, Modal } from "react-bootstrap";

export const AdminViewDrinkOrder = ({ orders, drinkMade, drinkPaid }) => {
  const [drinkDetail, setDrinkDetail] = React.useState(null);
  const [showDrinkDetailModal, setShowDrinkDetailModal] = React.useState(false);
  const [collapseInfo, setCollapseInfo] = React.useState({
    row1: "-",
    row2: "+",
  });

  console.log(orders);

  const currentOrdersCard = (drink) => {
    return (
      <Card
        key={drink._id}
        className={
          "card-drink" +
          (drink.made ? " card-drink--made" : "") +
          (drink.paid ? " card-drink--finished" : "")
        }
        id={"card-drink#" + drink.id}
      >
        <p
          className="card-drink__text"
          onClick={() => {
            setDrinkDetail(drink);
            setShowDrinkDetailModal(true);
          }}
        >
          Drink name: {drink.beverage}
        </p>
        <p className="card-drink__text">Quantity: {drink.quantity}</p>
        <p className="card-drink__text">Ordered by: {drink.user}</p>
        <p className="card-drink__text">Price per drink: {drink.price}</p>{" "}
        {/** TODO get from menu */}
        <p className="card-drink__text">
          Total price: {drink.price * drink.quantity}{" "}
          {/** TODO get from menu */}
        </p>
        <button
          className="card-drink__button"
          disabled={drink.made}
          onClick={() => drinkMade(drink._id)}
        >
          Ready to serve
        </button>
        <button
          className="card-drink__button"
          disabled={!drink.made}
          onClick={() => drinkPaid(drink._id)}
        >
          Paid
        </button>
      </Card>
    );
  };

  const finishedOrdersCard = (drink) => {
    return (
      <Card key={drink._id} className="card-drink card-drink--finished">
        <p className="card-drink__text">Drink name: {drink.beverage}</p>
        <p className="card-drink__text">Quantity: {drink.quantity}</p>
        <p className="card-drink__text">Ordered by: {drink.user}</p>
        <p className="card-drink__text">Made at: {drink.timeMade}</p>
        <p className="card-drink__text">Paid at: {drink.timePaid}</p>
      </Card>
    );
  };

  const drinkDetailModal = () => {
    return (
      <Modal
        show={showDrinkDetailModal}
        onHide={() => setShowDrinkDetailModal(false)}
        centered
      >
        <Modal.Header>
          <Modal.Title>
            Details - {drinkDetail ? drinkDetail.drink : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Ingredients</h4>
          <ul>Gin</ul>
          <ul>Tonic</ul>
        </Modal.Body>
      </Modal>
    );
  };

  const toggleCollapsible = (id1, id2) => {
    const collapsible1 = document.getElementById(id1);
    const collapsible2 = document.getElementById(id2);
    const isCollaps1Open = collapsible1.classList.contains(
      "admin-menu-container__collapsible"
    );
    if (isCollaps1Open) {
      collapsible1.classList.add(
        "admin-menu-container__collapsible--collapsed"
      );
      collapsible1.classList.remove("admin-menu-container__collapsible");
      collapsible2.classList.add("admin-menu-container__collapsible");
      collapsible2.classList.remove(
        "admin-menu-container__collapsible--collapsed"
      );
      setCollapseInfo({ row1: "+", row2: "-" });
    } else {
      collapsible1.classList.remove(
        "admin-menu-container__collapsible--collapsed"
      );
      collapsible1.classList.add("admin-menu-container__collapsible");
      collapsible2.classList.add(
        "admin-menu-container__collapsible--collapsed"
      );
      setCollapseInfo({ row1: "-", row2: "+" });
    }
  };

  return (
    <>
      <div className="admin-menu-container">
        <div className="title-neon--small">Tonight's orders</div>
        <div className="height100">
          <h3
            className="admin-menu-container__subtitle"
            onClick={() => toggleCollapsible("collapsible1", "collapsible2")}
          >
            Current orders {collapseInfo.row1}
          </h3>
          <div id="collapsible1" className="admin-menu-container__collapsible">
            {orders &&
              orders
                .filter((o) => !o.made || !o.paid)
                .map((d) => currentOrdersCard(d))}
          </div>
          <h3
            className="admin-menu-container__subtitle"
            onClick={() => toggleCollapsible("collapsible2", "collapsible1")}
          >
            Finished orders {collapseInfo.row2}
          </h3>
          <div
            id="collapsible2"
            className="admin-menu-container__collapsible--collapsed"
          >
            <div>
              {orders &&
                orders
                  .filter((o) => o.made && o.paid)
                  .map((d) => finishedOrdersCard(d))}
            </div>
          </div>
        </div>
      </div>
      {drinkDetailModal()}
    </>
  );
};
