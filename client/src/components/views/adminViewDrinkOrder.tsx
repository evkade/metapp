import React from "react";
import { Card, Modal } from "react-bootstrap";

export const AdminViewDrinkOrder = ({ orders, drinkMade, drinkPaid }) => {
  const [drinkDetail, setDrinkDetail] = React.useState(null);
  const [showDrinkDetailModal, setShowDrinkDetailModal] = React.useState(false);

  console.log(orders);

  const currentOrdersCard = (drink) => {
    return (
      <Card
        key={drink._id}
        className={"card-drink" + (drink.made ? " card-drink--made" : "")}
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

  return (
    <>
      <div className="admin-menu-container">
        <div className="title-neon--big">Tonight's orders</div>
        <div>
          <h3 className="admin-menu-container__subtitle">Current orders</h3>
          <div>
            {orders &&
              orders
                .filter((o) => !o.made || !o.paid)
                .map((d) => currentOrdersCard(d))}
          </div>
        </div>
      </div>
      <div>
        <h3>Finished orders</h3>
        <div>
          <h3 className="admin-menu-container__subtitle">Finished orders</h3>
          <div>
            {orders &&
              orders
                .filter((o) => o.made && o.paid)
                .map((d) => finishedOrdersCard(d))}
          </div>
        </div>
      </div>
      {drinkDetailModal()}
    </>
  );
};
