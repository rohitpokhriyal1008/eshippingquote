import React from "react";

const TextBoldCell = (props) => {
  return (
    <div
      style={{ width: props.width }}
      className="table-cell table-cell-text-bold"
    >
      <span>{props.value}</span>
    </div>
  );
};

export default TextBoldCell;
