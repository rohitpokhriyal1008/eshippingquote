import React, { useRef } from "react";
import CrossIcon from "../../../assets/icons/cross.svg";
const ButtonCell = (props) => {
  const toolTipInputRef = useRef();
  return (
    <div style={{ width: props.width }} className="table-cell table-cell-btn">
      {props.buttons.map((button, i) => {
        if (button.type === "edit") {
          return (
            <button
              key={"table_btn" + i + button.type}
              className={`table-cell-btn-edit primary-theme-btn ${button.disabled && "disable-edit-btn"}`}
              onClick={(e) => {
                e.stopPropagation();
                if (!button.disabled) {
                  button.cb(e);
                }
              }}
                /*onClick={button.disabled ? undefined : button.cb}*/ // Conditionally handle onClick
              onMouseEnter={() => button.disabled ? toolTipInputRef.current.style.visibility = "visible" : null}
              onMouseOut={() => toolTipInputRef.current.style.visibility = "hidden"}
            >
              <span ref={toolTipInputRef} className="tooltip">Please register with us to book this shipment.</span>
              {button.value}
            </button>
          );
        }
        if (button.type === "delete") {
          return (
            <button
              key={"table_btn" + i + button.type}
              className="table-cell-btn-delete primary-theme-btn"
              onClick={button.cb}
            >
              {button.value}
              <img src={CrossIcon} alt="x" />
            </button>
          );
        }
      })}
    </div>
  );
};

export default ButtonCell;
