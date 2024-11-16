import React, { useEffect } from "react";
import ShippingItems from "../../components/GetQuote/ShippingItems";
import MultipleBubbleSelector from "../../components/GetQuote/MultipleBubbleSelector";
import { useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import { quoteActions } from "../../store/quote";
const GetQuoteFTLPage = () => {
  const context = useOutletContext();
  const dispatcher = useDispatch();
  useEffect(() => {
    dispatcher(quoteActions.writeKey({ key: "shipmentType", value: "ftl" }));
  }, []);
  const siteServices = [
    {
      serviceKey: "pickupServices",
      serviceName: "Pickup",
      options: [
        "Construction Site",
        "Lift Gate",
        "Hotel",
        "Inside",
        "Limited Access",
        "Residential",
        "School",
        "Appointment",
        "Delivery Notification",
        "Sort + Segment",
        "Amazon FBA Delivery",
        "Ocean CFS Pickup",
        "Airline Pickup",
        "Ocean CFS Delivery",
        "Airline Delivery",
      ],
    },
    {
      serviceKey: "deliveryServices",
      serviceName: "Delivery",
      options: [
        "Construction Site",
        "Lift Gate",
        "Hotel",
        "Inside",
        "Limited Access",
        "Residential",
        "School",
        "Appointment",
        "Delivery Notification",
        "Sort + Segment",
        "Amazon FBA Delivery",
        "Ocean CFS Pickup",
        "Airline Pickup",
        "Ocean CFS Delivery",
        "Airline Delivery",
      ],
    },
    {
      serviceKey: "otherServices",
      serviceName: "Others",
      options: [
        "Construction Site",
        "Lift Gate",
        "Hotel",
        "Inside",
        "Limited Access",
        "Residential",
        "School",
        "Appointment",
        "Delivery Notification",
        "Sort + Segment",
        "Amazon FBA Delivery",
        "Ocean CFS Pickup",
        "Airline Pickup",
        "Ocean CFS Delivery",
        "Airline Delivery",
      ],
    },
  ];
  return (
    <>
      <ShippingItems />
      <p className="site-services">Choose site services</p>
      {siteServices.map(({ serviceKey, serviceName, options }) => (
        <MultipleBubbleSelector
          key={serviceKey}
          serviceKey={serviceKey}
          serviceName={serviceName}
          options={options}
        />
      ))}
    </>
  );
};

export default GetQuoteFTLPage;
