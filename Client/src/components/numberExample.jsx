import React from "react";

export const numberExample = (renderNumber, myNumber) => {
  return renderNumber ? <div> {myNumber}</div> : <div> Random Text </div>;
};
