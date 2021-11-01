import React from "react";
import mkmlogo from "../images/mkm_logo.png";
import dkmlogo from "../images/dkm_logo.png";

const EntryView = ({ history, modalOpen, setModalOpen }) => {
  return (
    <div className="container--general entry-view">
      <button
        onClick={() => setModalOpen(true)}
        className="general-button--bw general-button--bw--fixed"
      >
        About
      </button>
      <div className="entry-view__logos">
        <img src={mkmlogo} />
        <img src={dkmlogo} />
      </div>
      <div className="entry-view__neon-text">METAPP</div>
      <div>
        <button
          onClick={() => history.push("/logIn")}
          className="neon-button neon-button--yellow"
        >
          log in
        </button>
        <button
          onClick={() => history.push("/signUp")}
          className="neon-button neon-button--green"
        >
          sign up
        </button>
      </div>
      {modalOpen && (
        <div className="modal">
          <div className="modal__content">
            <div className="modal__headfoot">
              <div className="modal__title">About METAPP</div>
            </div>
            <div className="modal__body">
              <p>
                METAPP is an app that helps you as a bar guest to decide on what
                to drink tonight, as well as order it from the bar without
                leaving the fun conversation at your table. You can look at the
                menu for as long as you like, without stress and having to wait
                in a queue. You can switch between the MKM and DKM bar.
              </p>
              <p>
                When you place an order, it is sent to the bar personell which
                will handle your order and mark it as ready for pick up. It
                couldn't be easier! If you like the beverages you ordered, you
                can mark them as favorites for future bar nights.
              </p>
              <p>
                METAPP is a project made by George Basillious, Eva Despinoy,
                Agnes Forsberg and Amalia Berglöf in the course DH2643 Advanced
                Interaction Programming.
              </p>
            </div>
            <div className="modal__headfoot">
              <button onClick={() => setModalOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EntryView;
