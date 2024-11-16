import React, { useState } from "react";

const ToggleSelector = (props) => {
  const selectOption = (option) => {
    props.onItemInputValueChange(props.itemKey, option);
  };
  return (
    <div className="item-type-toggle">
      <span>{props.heading}</span>
      <div className={props.btnClass}>
        {props.options.map((option) => {
          return (
            <button
              onClick={() => selectOption(option)}
              key={option}
              className={option === props.selected ? props.selectedClass : ""}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ToggleSelector;
