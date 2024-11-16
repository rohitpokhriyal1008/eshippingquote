import React, { useState } from "react";
import "../../components/GetQuote/getQuote.css";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingInformation from "../../components/GetQuote/LoadingInformation";
import ShipmentType from "../../components/GetQuote/ShipmentType";
import { useSelector } from "react-redux";
import ltl from "../../assets/images/mob-ltl.svg";
import ftl from "../../assets/images/mob-ftl.svg";
import container from "../../assets/images/mob-container.svg";

const GetQuotePageMobile = (props) => {
  const { shipmentType } = useSelector((state) => state.quote);
  const navigator = useNavigate();
  let source;

  if (shipmentType === "ltl") source = ltl;
  if (shipmentType === "ftl") source = ftl;
  if (shipmentType === "fcl") source = container;

  const quoteConfig = useSelector((state) => state.quote);

  const [isDestination, setIsDestination] = React.useState(true);
  const [isOrigin, setIsOrigin] = React.useState(true);
  const [isLoadingDate, setIsLoadingDate] = React.useState(true);
  const [isOriginInternational , setIsOriginInternational] = useState(false);
  const [isDestinationInternational , setIsDestinationInternational] = useState(false);

  const [onClickLTL, setOnClickLTL] = useState(false);
  const [validDescription, setValidDescription] = useState(true);
  const [validWeight, setValidWeight] = useState(true);
  const [validLength, setValidLength] = useState(true);
  const [validWidth, setValidWidth] = useState(true);
  const [validHeight, setValidHeight] = useState(true);
  const [validQuantity, setValidQuantity] = useState(true);

  const [onClickCONT, setOnClickCONT] = useState(false);
  const [validCommodity, setValidCommodity] = useState(true);
  const [validQuantityCONT, setValidQuantityCONT] = useState(true);
  const [validDescriptionCONT, setValidDescriptionCONT] = useState(true);
  const [validWeightCONT, setValidWeightCONT] = useState(true);

  const submitHandler = () => {
    if (!quoteConfig.destination) setIsDestination(false);
    if (!quoteConfig.origin) setIsOrigin(false);
    if (!quoteConfig.loadingDate) setIsLoadingDate(false);

    let check = 0;
    let shippingItems = "";
    if (shipmentType === "ltl") {
      setOnClickLTL(true);
      shippingItems = quoteConfig.items;
    }
    if (shipmentType === "fcl") {
      setOnClickCONT(true);
      shippingItems = quoteConfig.containers;
    }

    shippingItems.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (!item[key]) {
          check++;
          return;
        }
      });
    });

    window.scrollTo({ top: 160, behavior: "smooth" });
    if (check > 0) return;

    if (
      !quoteConfig.destination ||
      !quoteConfig.origin ||
      !quoteConfig.loadingDate
    )
      return;
    window.quoteConfig = { ...window.quoteConfig, ...quoteConfig };

    navigator("/get-quote-result");
  };

  return (
    <div className="get-quote-container">
      <h2>GET QUOTE</h2>
      <h3>{shipmentType?.toUpperCase() || "LTL"}</h3>

      <img src={source || ltl}></img>
      <LoadingInformation
        isLoadingDate={isLoadingDate}
        setIsLoadingDate={setIsLoadingDate}
        setIsDestination={setIsDestination}
        setIsOrigin={setIsOrigin}
        isDestination={isDestination}
        isOrigin={isOrigin}
        isOriginInternational={isOriginInternational}
        setIsOriginInternational={setIsOriginInternational}
        isDestinationInternational={isDestinationInternational}
        setIsDestinationInternational={setIsDestinationInternational}
      />
      {/* <ShipmentType /> */}
      <Outlet
        context={{
          onClickLTL,
          setOnClickLTL,
          validDescription,
          setValidDescription,
          validWeight,
          setValidWeight,
          validLength,
          setValidLength,
          validWidth,
          setValidWidth,
          validHeight,
          setValidHeight,
          validQuantity,
          setValidQuantity,
          onClickCONT,
          setOnClickCONT,
          validQuantityCONT,
          setValidQuantityCONT,
          validDescriptionCONT,
          setValidDescriptionCONT,
          validWeightCONT,
          setValidWeightCONT,
          validCommodity,
          setValidCommodity,
            isOriginInternational,
            setIsOriginInternational,
            isDestinationInternational,
            setIsDestinationInternational,
        }}
      />
      <button
        style={{ margin: "40px 0px 50px", padding: "15px 100px" }}
        className="primary-theme-btn"
        onClick={submitHandler}
      >
        GET QUOTE
      </button>
    </div>
  );
};

export default GetQuotePageMobile;
