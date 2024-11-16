import React, { useEffect, useState } from "react";
import "../../components/GetQuote/getQuote.css";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingInformation from "../../components/GetQuote/LoadingInformation";
import ShipmentType from "../../components/GetQuote/ShipmentType";
import shippingQuoteApiClient from "../../adapters/restClient";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../store/modal";
import GetQuotePageMobile from "./mobileGetQuote";

const GetQuotePage = (props) => {
  const { shipmentType } = useSelector((state) => state.quote);
  const dispatcher = useDispatch(); 
  const auth = useSelector((state) => state.auth);
  const navigator = useNavigate();
  const platformView = useSelector(
    (state) => state.platformView.renderViewType
  );

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

    let invalidValue = false;
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
          invalidValue = true;
          return;
        }
      });
    });
    
    if (Object.keys(window.pinValidation).length) {
      if (!window.pinValidation["origin"]) {
        setIsOrigin(false);
        invalidValue = true;
      }
      if (!window.pinValidation["destination"]) {
        setIsDestination(false);
        invalidValue = true;
      }
    } else {
      setIsLoadingDate(false);
      setIsOrigin(false); 
      invalidValue = true;
    }

    if (invalidValue) {
      window.scrollTo({ top: 160, behavior: "smooth" });
      return;
    }

    window.quoteConfig = { ...window.quoteConfig, ...quoteConfig };

    if (
      !window.quoteConfig.destination ||
      !window.quoteConfig.origin ||
      !window.quoteConfig.loadingDate
    )
      return;

    navigator("/get-quote-result");
  };

  const validateToken = async (token) => {
    try {
      const { data } = await shippingQuoteApiClient({
        method: "post",
        url: "/api/validateToken",
        data: { storedToken: token },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (data.tokenValidity && data.incompleteAccountDetails) {
        showModal();
      }
    } catch (err) {
      console.error(err);
      // alert("Failed to get user details");
    }
  };

  const showModal = () => {
    dispatcher(
      modalActions.open({
        modalType: "redirectUser",
        modalData: { redirect: () => navigator("/account") },
      })
    )
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    validateToken(auth.token);
  }, []);

  if (platformView === "mobile") return <GetQuotePageMobile />;

  return (
    <div className="get-quote-container">
      <h2>GET QUOTE ({shipmentType === "ltl" ? "LTL" : "CONTAINER"}) </h2>
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
      <ShipmentType />
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

export default GetQuotePage;
