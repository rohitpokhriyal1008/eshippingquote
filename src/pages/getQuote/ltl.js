import React, { useEffect, useState } from "react";
import ShippingItems from "../../components/GetQuote/ShippingItems";
import MultipleBubbleSelector from "../../components/GetQuote/MultipleBubbleSelector";
import { useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import { quoteActions } from "../../store/quote";
import shippingQuoteApiClient from "../../adapters/restClient";
const GetQuoteLTLPage = () => {
  const context = useOutletContext();
  const dispatcher = useDispatch();
  const [siteServices, setSiteServices] = useState([]);

  const siteServiceDispatcher = (key, value) => {
    dispatcher(quoteActions.writeKey({ key, value }));
  };
  const getAccessorialServices = async () => {
    try {
      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      const { data } = await shippingQuoteApiClient({
        method: "get",
        url: "/api/getQuoteUIInputs",
      });

      const { accessorialServices } = data;
      const accessorialServicesMap = Object.entries(accessorialServices).map(
        ([key, value]) => {
          const serviceName =
            capitalizeFirstLetter(key.split("Services")[0].toLowerCase()) +
            " Services";
          const serviceKey = key;
          const options = value;
          return { serviceKey, serviceName, options };
        }
      );
      setSiteServices(accessorialServicesMap);
    } catch (err) {
      console.error(err);
      // alert("Failed to get accessorial!");
    }
  };
  useEffect(() => {
    dispatcher(quoteActions.writeKey({ key: "shipmentType", value: "ltl" }));
    getAccessorialServices();
  }, []);
  return (
    <>
      <ShippingItems
        onClickLTL={context.onClickLTL}
        setOnClickLTL={context.setOnClickLTL}
        validDescription={context.validDescription}
        setValidDescription={context.setValidDescription}
        validWeight={context.validWeight}
        setValidWeight={context.setValidWeight}
        validLength={context.validLength}
        setValidLength={context.setValidLength}
        validWidth={context.validWidth}
        setValidWidth={context.setValidWidth}
        validHeight={context.validHeight}
        setValidHeight={context.setValidHeight}
        validQuantity={context.validQuantity}
        setValidQuantity={context.setValidQuantity}
        isOriginInternational={context.isOriginInternational}
        isDestinationInternational={context.isDestinationInternational}
      />
      <p className="site-services">Choose site services</p>
      {siteServices.map(({ serviceKey, serviceName, options }) => (
        <MultipleBubbleSelector
          key={serviceKey}
          serviceKey={serviceKey}
          serviceName={serviceName}
          options={options}
          cb={siteServiceDispatcher}
        />
      ))}
    </>
  );
};

export default GetQuoteLTLPage;
