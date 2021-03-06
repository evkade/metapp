import React from "react";
import { Modal } from "react-bootstrap";
import OrderCard from "./adminOrderCard";

export const AdminViewOrder = ({
  orders,
  beverageMade,
  beveragePaid,
  menu,
  cancel,
  loading,
  spinner,
  beverageDetail,
  setBeverageDetail,
  showBeverageDetailModal,
  setShowBeverageDetailModal,
  collapseInfo,
  setCollapseInfo,
}) => {
  const getBeverageDetail = (beverage) => {
    const menuItem = menu.find((bev) => bev.name === beverage.beverage);
    return (
      <div key={beverage.beverage} className="order-modal__beverage">
        <p>
          {beverage.quantity +
            " " +
            beverage.beverage +
            " - " +
            (menuItem.alcoholPercentage
              ? menuItem.alcoholPercentage + "% - "
              : menuItem.alcoholVolume + "cl - ") +
            menuItem.price +
            "kr"}
        </p>
        {menuItem.ingredients ? (
          <ul>
            {menuItem.ingredients.map((ingredient, index) => (
              <li key={index + ingredient}>{ingredient}</li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  };

  const BeverageDetailModal = () => {
    return (
      <Modal
        show={showBeverageDetailModal}
        onHide={() => setShowBeverageDetailModal(false)}
        centered
        className="order-modal"
      >
        <Modal.Header>
          <Modal.Title>Order details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="order-modal__body">
          {beverageDetail.order.map((b) => getBeverageDetail(b))}
        </Modal.Body>
      </Modal>
    );
  };

  const toggleCollapsible = () => {
    const collapsible1 = document.getElementById("collapsible1");
    const collapsible2 = document.getElementById("collapsible2");
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
        {loading ? (
          spinner
        ) : (
          <>
            <div className="title-neon--small">Tonight's orders</div>
            <div className="height100">
              <h3
                className="admin-menu-container__subtitle"
                onClick={() => toggleCollapsible()}
              >
                Current orders {collapseInfo.row1}
              </h3>
              <div
                id="collapsible1"
                className="admin-menu-container__collapsible"
              >
                {orders &&
                  menu.length > 0 &&
                  orders
                    .filter((o) => (!o.made || !o.paid) && !o.cancelled)
                    .map((b, index) => {
                      return (
                        <OrderCard
                          key={index}
                          fullOrder={b}
                          menu={menu}
                          setBeverageDetail={setBeverageDetail}
                          setShowModal={setShowBeverageDetailModal}
                          made={beverageMade}
                          paid={beveragePaid}
                          cancel={cancel}
                        />
                      );
                    })}
              </div>
              <div className="admin-menu-container__fade"></div>
              <h3
                className="admin-menu-container__subtitle"
                onClick={() => toggleCollapsible()}
              >
                Finished orders {collapseInfo.row2}
              </h3>
              <div
                id="collapsible2"
                className="admin-menu-container__collapsible--collapsed"
              >
                {orders &&
                  orders
                    .filter((o) => (o.made && o.paid) || o.cancelled)
                    .map((order, index) => {
                      return (
                        <OrderCard
                          key={index}
                          fullOrder={order}
                          menu={menu}
                          setBeverageDetail={setBeverageDetail}
                          setShowModal={setShowBeverageDetailModal}
                          made={beverageMade}
                          paid={beveragePaid}
                          cancel={cancel}
                        />
                      );
                    })}
              </div>
            </div>{" "}
          </>
        )}
      </div>
      {beverageDetail && BeverageDetailModal()}
    </>
  );
};

export default AdminViewOrder;
