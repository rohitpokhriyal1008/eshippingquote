import React, { useEffect, useState, useRef } from "react";
import "../../components/Shipments/shipments.css";
import BackIcon from "../../assets/icons/back.svg";
import ShippingDetailDemo from "../../assets/images/shipping-detail-demo.svg";
import { useNavigate, useParams } from "react-router-dom";
import shippingQuoteApiClient, { apiBaseURL } from "../../adapters/restClient";
import { useSelector } from "react-redux";
import HTMLReactParser from "html-react-parser";
import Loader from "../../components/HOC/Loader";

const ShipmentDetailsPage = () => {
  const platformView = useSelector(
    (state) => state.platformView.renderViewtype
  );

  const navigator = useNavigate();
  const mapRef = useRef();
  const mapDivRef = useRef();
  const directionsDisplayRef = useRef();
  const directionsServiceRef = useRef();
  const [isLoading, setLoading] = useState(true);
  const auth = useSelector((state) => state.auth);
  const { id: shipmentId } = useParams();
  const [shipmentDetails, setShipmentDetails] = useState({
    route: null,
    billingCode: null,
    type: null,
    schedule: null,
    activity: null,
    status: null,
    legsData: [],
    details: [],
    timeline: "<br/>",
    documents: [],
  });
  const getShipmentDetails = async () => {
    try {
      const { data } = await shippingQuoteApiClient({
        method: "get",
        url: `/api/getShipment?shipmentId=${shipmentId}`,
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setLoading(false);
      const { shipmentOrder, success } = data;
      if (!success || !shipmentOrder) {
        throw new Error("Failed to get shipment details");
      }
      setShipmentDetails({
        route: shipmentOrder.shipment,
        billingCode: shipmentOrder.billingCode,
        type: shipmentOrder.type,
        schedule: shipmentOrder.schedule,
        activity: shipmentOrder.activity,
        status: shipmentOrder.status,
        legsData: shipmentOrder.shipmentLegs.map((leg) => {
          return `${leg.pickup} -> ${leg.delivery}, ${leg.signedBy}, ${leg.status}`;
        }),
        details: shipmentOrder.notesList.map((note) => {
          return {
            field: note.time.split("T")[0],
            value: note.note,
          };
        }),
        timeline: shipmentOrder.timeline,
        documents: shipmentOrder.documents.map((doc) => {
          return {
            field: doc.split("/")[doc.split("/").length - 1],
            value: doc,
          };
        }),
      });
    } catch (err) {
      console.error(err);
      // alert("Failed to load shipment, retry");
      setLoading(false);

      navigator(-1);
    }
  };
  const calcRoute = (map, originPin, destinationPin) => {
    let startMark = new window.google.maps.Marker({
      position: originPin,
      map: map,
      title: "start",
    });
    let endMark = new window.google.maps.Marker({
      position: destinationPin,
      map: map,
      title: "end",
    });
    let request = {
      origin: originPin,
      destination: destinationPin,
      travelMode: "DRIVING",
    };
    directionsServiceRef.current = new window.google.maps.DirectionsService();
    directionsServiceRef.current.route(request, function (response, status) {
      if (status == "OK") {
        directionsDisplayRef.current.setDirections(response);
      } else {
        // alert("directions request failed, status=" + status);
      }
    });
  };

  useEffect(() => {
    if (!isLoading) {
      const originPin = new window.google.maps.LatLng(31.3538, -83.4854);
      const destinationPin = new window.google.maps.LatLng(34.0522, -118.2437);

      directionsDisplayRef.current =
        new window.google.maps.DirectionsRenderer();
      mapRef.current = new window.google.maps.Map(mapDivRef.current, {
        center: originPin,
        zoom: 8,
      });
      directionsDisplayRef.current.setMap(mapRef.current);
      calcRoute(mapDivRef.current, originPin, destinationPin);
    }
    getShipmentDetails();
  }, [isLoading]);

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <div className="shipment-details-container">
        <div className="shipment-details-heading">
          <button className="go-back-btn" onClick={() => navigator(-1)}>
            <img src={BackIcon} alt="bi" />
            {platformView === "desktop" && <span>Go Back</span>}
          </button>
          <h2>Shipment Details</h2>
        </div>
        <div className="shipment-details-wrapper">
          <div className="shipment-map-container">
            <div className="shipment-map" ref={mapDivRef}></div>
          </div>
          <div className="details-box">
            <h2>Shipment</h2>
            <div className="details-container">
              <div className="detail-tile">
                <span>Route:</span>
                <span>{shipmentDetails.route}</span>
              </div>
              <div className="detail-tile">
                <span>Billing Code:</span>
                <span>{shipmentDetails.billingCode}</span>
              </div>
              <div className="detail-tile">
                <span>Type:</span>
                <span>{shipmentDetails.type}</span>
              </div>
              <div className="detail-tile">
                <span>Schedule:</span>
                <span>{shipmentDetails.schedule}</span>
              </div>
              <div className="detail-tile">
                <span>Activity:</span>
                <span>{shipmentDetails.activity}</span>
              </div>
              <div className="detail-tile">
                <span>Status:</span>
                <span>{shipmentDetails.status}</span>
              </div>
            </div>
          </div>
          <div className="details-box">
            <h2>Legs Data</h2>
            <div className="details-container">
              {shipmentDetails.legsData.map((leg) => {
                return (
                  <div
                    key={leg}
                    className="detail-tile"
                    style={{ gridTemplateColumns: "auto" }}
                  >
                    <span>{leg}</span>
                    {/* <span></span> */}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="details-box">
            <h2>Details</h2>
            <div className="details-container">
              {shipmentDetails.details.map((detail) => {
                return (
                  <div key={JSON.stringify(detail)} className="detail-tile">
                    <span>{`${detail.field} :`}</span>
                    <span>{detail.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="details-box">
            <h2>Timeline</h2>
            <div className="details-container">
              <div
                className="detail-tile"
                style={{ gridTemplateColumns: "auto" }}
              >
                <span>{HTMLReactParser(shipmentDetails.timeline)}</span>
              </div>
            </div>
          </div>
          <div className="details-box">
            <h2>Documents</h2>
            <div className="details-container">
              {shipmentDetails.documents.map((detail) => {
                return (
                  <div key={JSON.stringify(detail)} className="detail-tile">
                    <span>{`${detail.field} :`}</span>
                    <span
                      onClick={() =>
                        window.open(`${apiBaseURL}${detail.value}`)
                      }
                      style={{ textDecoration: "underline" }}
                    >
                      Click here
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ShipmentDetailsPage;
