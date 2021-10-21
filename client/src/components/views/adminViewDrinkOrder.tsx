import React from "react";
import { Card, Modal } from "react-bootstrap";

export const AdminViewDrinkOrder = ({ orders, drinkMade, drinkPaid }) => {
  const [drinkDetail, setDrinkDetail] = React.useState(null);
  const [showDrinkDetailModal, setShowDrinkDetailModal] = React.useState(false);

  const singleBeverageCard = (drink) => {
    return (
      <Card
        key={drink.id}
        className={"drinkCard" + (drink.made ? " drinkCard--made" : "")}
        id={"drinkCard#" + drink.id}
      >
        <p
          className="drinkCard__text drinkCard__text--title"
          onClick={() => {
            setDrinkDetail(drink);
            setShowDrinkDetailModal(true);
          }}
        >
          {drink.order[0].quantity + " " + drink.order[0].beverage}
        </p>
        <p className="drinkCard__text">Ordered by: {drink.user}</p>{" "}
        {/** TODO get username */}
        <p className="drinkCard__text">Price per drink: {drink.price}</p>{" "}
        {/** TODO get from menu */}
        <p className="drinkCard__text">
          Total price: {drink.price * drink.quantity}{" "}
          {/** TODO get from menu */}
        </p>
        <button
          className="drinkCard__button"
          disabled={drink.made}
          onClick={() => drinkMade(drink.id)}
        >
          Ready to serve
        </button>
        <button
          className="drinkCard__button"
          disabled={!drink.made}
          onClick={() => drinkPaid(drink.id)}
        >
          Paid
        </button>
      </Card>
    );
  };

  const multipleBeveragesCard = (drink) => {
    return (
      <Card
        key={drink._id}
        className={"drinkCard" + (drink.made ? " drinkCard--made" : "")}
        id={"drinkCard#" + drink.id}
      >
        <p
          className="drinkCard__text drinkCard__text--title"
          onClick={() => {
            setDrinkDetail(drink);
            setShowDrinkDetailModal(true);
          }}
        >
          Multiple beverages (click for details)
        </p>
        <p className="drinkCard__text">Ordered by: {drink.user}</p>
        <p className="drinkCard__text">Price per drink: {drink.price}</p>{" "}
        {/** TODO get from menu */}
        <p className="drinkCard__text">
          Total price: {drink.price * drink.quantity}{" "}
          {/** TODO get from menu */}
        </p>
        <button
          className="drinkCard__button"
          disabled={drink.made}
          onClick={() => drinkMade(drink.id)}
        >
          Ready to serve
        </button>
        <button
          className="drinkCard__button"
          disabled={!drink.made}
          onClick={() => drinkPaid(drink.id)}
        >
          Paid
        </button>
      </Card>
    );
  };

  const finishedOrdersCard = (drink) => {
    return (
      <Card key={drink.id} className="drinkCard drinkCard--finished">
        {drink.order.map((b) => (
          <span key={drink.order.id} className="drinkCard__text">
            {" "}
            {b.quantity} {b.beverage},
          </span>
        ))}
        <p className="drinkCard__text">Ordered by: {drink.user}</p>
        <p className="drinkCard__text">Made at: {drink.timeMade}</p>
        <p className="drinkCard__text">Paid at: {drink.timePaid}</p>
      </Card>
    );
  };

  const getBeverageDetail = (beverage) => {
    return (
      <div>
        <h4>{beverage.quantity + " " + beverage.beverage}</h4>
      </div>
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
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {drinkDetail.order.map((b) => getBeverageDetail(b))}
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <>
      <div className="adminOrderView">
        <div className="pageTitleNeon">Tonight's orders</div>
        <div>
          <h3 className="adminOrderView__subtitle">Current orders</h3>
          <div>
            {orders &&
              orders
                .filter((o) => !o.made || !o.paid)
                .map((b) =>
                  b.order.length === 1
                    ? singleBeverageCard(b)
                    : multipleBeveragesCard(b)
                )}
          </div>
        </div>
        <div>
          <h3 className="adminOrderView__subtitle">Finished orders</h3>
          <div>
            {orders &&
              orders
                .filter((o) => o.made && o.paid)
                .map((d) => finishedOrdersCard(d))}
          </div>
        </div>
      </div>
      {drinkDetail && drinkDetailModal()}
    </>
  );
};
