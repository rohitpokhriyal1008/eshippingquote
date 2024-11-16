import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LinkCell = (props) => {
  const platformView = useSelector(
    (state) => state.platformView.renderViewType
  );
  let header;
  if (platformView === "mobile") {
    if (props.header === "shipmentId") header = "Shipment ID";
  }

  const navigator = useNavigate();
  const navigateToShippingDetails = (id) => {
    navigator(`/shipment-details/${id}`);
  };
  return (
    <div
      style={{ width: props.width }}
      className="table-cell table-cell-text-bold"
    >
      {platformView === "mobile" && <span>{header}</span>}
      <a
        href={`/shipment-details/${props.value}`}
      >
        {props.value}
      </a>
    </div>
  );
};

export default LinkCell;
