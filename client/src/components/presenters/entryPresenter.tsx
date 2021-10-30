import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import EntryView from "../views/entryView";

const EntryPresenter = () => {
  const history = useHistory();

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <EntryView
      history={history}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
    />
  );
};

export default EntryPresenter;
