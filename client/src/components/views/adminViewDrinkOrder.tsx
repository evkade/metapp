import React from "react";
import { Modal } from "react-bootstrap";
import OrderCard from "./adminOrderCard";

const AdminViewDrinkOrder = ({
  orders,
  drinkMade,
  drinkPaid,
  menu,
  cancel,
  loading,
  spinner,
  drinkDetail,
  setDrinkDetail,
  showDrinkDetailModal,
  setShowDrinkDetailModal,
  collapseInfo,
  setCollapseInfo,
}) => {
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
                          setDrinkDetail={setDrinkDetail}
                          setShowModal={setShowDrinkDetailModal}
                          made={drinkMade}
                          paid={drinkPaid}
                          cancel={cancel}
                        />
                      );
                    })}
              </div>
            </div>{" "}
          </>
        )}
      </div>
      {drinkDetail && drinkDetailModal()}
    </>
  );
};

export default AdminViewDrinkOrder;
