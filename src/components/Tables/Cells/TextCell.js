import React from "react";
import { useSelector } from "react-redux";

const TextCell = (props) => {
  const platformView = useSelector(
    (state) => state.platformView.renderViewType
  );
  let header;
  if (platformView === "mobile") {
    if (props.header === "doorService") header = "Door Service";
    if (props.header === "transit") header = "Transit";
    if (props.header === "delivery") header = "Delivery";
    if (props.header === "type") header = "Type";
    if (props.header === "shipment") header = "Route";
    if (props.header === "schedule") header = "Schedule";
    if (props.header === "bookedBy") header = "Booked By";
  }

  return (
    <div style={{ width: props.width }} className="table-cell table-cell-text">
      {platformView === "mobile" && (
        <span>{header ? `${header} : ${props.value}` : `${props.value}`}</span>
      )}
      {platformView === "desktop" && <span>{props.value}</span>}
    </div>
  );
};

export default TextCell;
