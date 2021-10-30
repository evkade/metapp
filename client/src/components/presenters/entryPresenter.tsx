import React from "react";
import { useHistory } from "react-router-dom";
import EntryView from "../views/entryView";

const EntryPresenter = () => {
  const history = useHistory();

  return <EntryView history={history} />;
};

export default EntryPresenter;
