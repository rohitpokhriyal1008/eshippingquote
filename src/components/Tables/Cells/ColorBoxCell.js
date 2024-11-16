import React from "react";

const ColorBoxCell = (props) => {
  return (
    <div
      className="table-cell table-cell-colorbox"
      style={{ width: props.width }}
    >
      <span style={{ backgroundColor: props.color, color: props.textColor }}>
        {props.value}
      </span>
    </div>
  );
};

export default ColorBoxCell;
