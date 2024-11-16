import React, { useEffect } from "react";
import MultipleBubbleSelector from "../../components/GetQuote/MultipleBubbleSelector";
import { useOutletContext } from "react-router-dom";
import ShippingItemsFCL from "../../components/GetQuote/ShippingItemsFCL";
import { useDispatch } from "react-redux";
import { quoteActions } from "../../store/quote";

const GetQuoteContainerPage = () => {
  const context = useOutletContext();
  const dispatcher = useDispatch();
  useEffect(() => {
    dispatcher(quoteActions.writeKey({ key: "shipmentType", value: "fcl" }));
  }, []);
  return (
    <>
      <ShippingItemsFCL
        onClickCONT={context.onClickCONT}
        setOnClickCONT={context.setOnClickCONT}
        validDescriptionCONT={context.validDescriptionCONT}
        setValidDescriptionCONT={context.setValidDescriptionCONT}
        validWeightCONT={context.validWeightCONT}
        setValidWeightCONT={context.setValidWeightCONT}
        validQuantityCONT={context.validQuantityCONT}
        setValidQuantityCONT={context.setValidQuantityCONT}
        validCommodity={context.validCommodity}
        setValidCommodity={context.setValidCommodity}
      />
    </>
  );
};

export default GetQuoteContainerPage;
