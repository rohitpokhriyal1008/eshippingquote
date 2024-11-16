import React from "react";

const ColorBoxCellMobile = (props) => {
  return (
    <div
      className="table-cell table-cell-colorbox"
      style={{ width: props.width }}
    >
      <span style={{ backgroundColor: props.color, color: props.textColor }}>
        <span className="workaround-head">on time</span>
        <strong>{parseInt(props.value) + "% "}</strong>
      </span>
    </div>
  );
};

export default ColorBoxCellMobile;
