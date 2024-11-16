import React from "react";
import "./getQuote.css";
import LTLImage from "../../assets/images/ltl.svg";
import FTLImage from "../../assets/images/ftl.svg";
import ContainerImage from "../../assets/images/container.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { quoteActions } from "../../store/quote";
const ShipmentType = (props) => {
  const navigator = useNavigate();
  const location = useLocation();
  const dispatcher = useDispatch();
  const isSelected = (path) => `/get-quote/${path}` === location.pathname;
  const chooseAndNavigateToShipmentType = (shipmentType, route) => {
    dispatcher(
      quoteActions.writeKey({ key: "shipmentType", value: shipmentType })
    );
    navigator(route);
  };
  return (
    <div className="shippment-type-container">
      <p>Choose shipment type</p>
      <div className="shippment-type">
        <div className={isSelected("ltl") ? "shippment-selected" : ""}>
          <span>LTL</span>
          <div
            onClick={() =>
              chooseAndNavigateToShipmentType("ltl", "/get-quote/ltl")
            }
            className="img-container"
          >
            <img src={LTLImage} alt="IC" />
          </div>
          <span>Less-than-Truck Load</span>
        </div>
        {/* <div className={isSelected("ftl") ? "shippment-selected" : ""}>
          <span>FTL</span>
          <div
            onClick={() =>
              chooseAndNavigateToShipmentType("ftl", "/get-quote/ftl")
            }
            className="img-container"
          >
            <img src={FTLImage} alt="IC" />
          </div>
          <span>Full-Truck Load</span>
        </div> */}
        <div className={isSelected("container") ? "shippment-selected" : ""}>
          <span>CONTAINER</span>
          <div
            onClick={() =>
              chooseAndNavigateToShipmentType("fcl", "/get-quote/container")
            }
            className="img-container"
          >
            <img style={{ width: "75%" }} src={ContainerImage} alt="IC" />
          </div>
          <span>Container</span>
        </div>
      </div>
    </div>
  );
};

export default ShipmentType;
