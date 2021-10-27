import React from "react";
import { Modal } from "react-bootstrap";
import OrderCard from "./adminOrderCard";

export const AdminViewDrinkOrder = ({
  orders,
  drinkMade,
  drinkPaid,
  menu,
  beerMenu,
  cocktailMenu,
  cancel,
}) => {
  const [drinkDetail, setDrinkDetail] = React.useState(null);
  const [showDrinkDetailModal, setShowDrinkDetailModal] = React.useState(false);
  const [collapseInfo, setCollapseInfo] = React.useState({
    row1: "-",
    row2: "+",
  });

  const getBeverageDetail = (beverage) => {
    return (
      <div key={beverage.id}>
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
              menu.length > 0 &&
              orders
                .filter((o) => (!o.made || !o.paid) && !o.cancelled)
                .map((b) => {
                  return (
                    <OrderCard
                      fullOrder={b}
                      menu={menu}
                      setDrinkDetail={setDrinkDetail}
                      setShowModal={setShowDrinkDetailModal}
                      made={drinkMade}
                      paid={drinkPaid}
                      cancel={cancel}
                    />
                  );
                })}
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
                  .filter((o) => (o.made && o.paid) || o.cancelled)
                  .map((order) => {
                    return (
                      <OrderCard
                        fullOrder={order}
                        menu={menu}
                        setDrinkDetail={setDrinkDetail}
                        setShowModal={setShowDrinkDetailModal}
                        made={drinkMade}
                        paid={drinkPaid}
                        cancel={cancel}
                      />
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
      {drinkDetail && drinkDetailModal()}
    </>
  );
};
