import React from "react";
import FlightIcon from "../../../assets/icons/flight.svg";
import TruckIcon from "../../../assets/icons/truck.svg";
import ShipIcon from "../../../assets/icons/ship.svg";
import DotIcon from "../../../assets/icons/dot.svg";

import RightArrowSmIcon from "../../../assets/icons/right-arrow-sm.svg";

const TransitPathCell = (props) => {
  const { path } = props;
  let iconSrc;
  if (path.iconType) {
    if (path.iconType.includes("air")) {
      iconSrc = FlightIcon;
    } else if (path.iconType.includes("ocean")) {
      iconSrc = ShipIcon;
    } else if (path.iconType === "fcl" || path.iconType === "truck" || path.iconType === "ftl") {
      iconSrc = TruckIcon;
    } else {
      iconSrc = DotIcon;
    }
  } else {
    iconSrc = TruckIcon; // Default icon when iconType is undefined
  }
  return (
    <div
      className="table-cell table-cell-transitpath"
      style={{ width: props.width }}
    >
      <div className="transit-head">
        <img alt="ic" src={iconSrc} />
        <span>{path.value}</span>
      </div>
      {path.child.map((leg, i) => {
        return (
          <div key={`${path.value + i.toString()}`}>
            <img
              alt="ic"
              src={
                leg.type === "truck"
                  ? TruckIcon
                  : leg.type === "air"
                  ? FlightIcon
                  : leg.type === "ocean"
                  ? ShipIcon
                  : DotIcon
              }
            />
            <span>{leg.from} on <strong>{leg.pickupDate} </strong></span>
            <img alt="ri" src={RightArrowSmIcon} />
            <span>{leg.to} on <strong>{leg.dropoffDate}</strong></span>

            {leg.carrierName && (
                <span> :: {leg.carrierName}</span>
            )}


          </div>
        );
      })}
      {/* <div>
        <img alt="ic" src={TruckIcon} />
        <span>Leg 1:23345</span>
        <img alt="ri" src={RightArrowSmIcon} />
        <span>723345 : Ward Trucking</span>
      </div>
      <div>
        <img alt="ic" src={ShipIcon} />
        <span>Leg 1:23345</span>
        <img alt="ri" src={RightArrowSmIcon} />
        <span>723345 : Ward Shipping</span>
      </div>
      <div>
        <img alt="ic" src={FlightIcon} />
        <span>Leg 1:23345</span>
        <img alt="ri" src={RightArrowSmIcon} />
        <span>723345 : Ward Flying</span>
      </div> */}
    </div>
  );
};

export default TransitPathCell;
