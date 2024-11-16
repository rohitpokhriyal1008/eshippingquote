import React from "react";

const RoundTextCell = (props) => {
  return (
    <div
      style={{ width: props.width }}
      className="table-cell--row-no table-cell"
    >
      <span className="round-theme-circle">{props.value}</span>
    </div>
  );
};

export default RoundTextCell;
