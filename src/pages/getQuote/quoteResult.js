import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import shippingQuoteApiClient from "../../adapters/restClient";
import BackIcon from "../../assets/icons/back.svg";
import "../../components/GetQuote/getQuote.css";
import Loader from "../../components/HOC/Loader";
import PaginationTable from "../../components/Tables/PaginationTable";
import arrowhead from "../../assets/icons/arrowhead.svg";
import arrowheaddown from "../../assets/icons/arrowheaddown.svg";
import { modalActions } from "../../store/modal";

const QuoteResult = () => {
  const auth = useSelector((state) => state.auth);
  const platformView = useSelector(
    (state) => state.platformView.renderViewType
  );
  const dispatcher = useDispatch();
  const navigator = useNavigate();

  const mapRef = useRef();
  const mapDivRef = useRef();
  const directionsDisplayRef = useRef();
  const directionsServiceRef = useRef();

  const [isLoading, setLoading] = useState(true);
  const [quoteResultData, setQuoteResultData] = useState({});
  const [viewSummary, setViewSummary] = useState(false);
  const [msg, setMsg] = useState("");
  const [validateQuote, setValidateQuote] = useState(true);
  const [selectedRowMetaData, setSelectedRowMetaData] = useState({
    selectedRow: [],
    data: {
      selectQuoteToViewSummary: "",
    },
  });
  const [summaryData, setSummaryData] = useState({});

  const tableConfigrartion = {
    colWidth: ["5%", "35%", "8%", "10%", "8%", "14%", "10%", "10%"],
    headers: [
      {
        type: "bold",
        name: "Number",
        key: "number",
        visible: "no",
      },
      {
        type: "bold",
        name: "Transit Path",
        key: "transitPath",
        visible: "Yes",
      },
      {
        type: "bold",
        name: "Door Service",
        key: "doorService",
      },
      {
        type: "bold",
        name: "Delivery",
        key: "delivery",
      },
      {
        type: "bold",
        name: "Transit",
        key: "transit",
      },
      {
        type: "bold",
        name: "Cost",
        key: "cost",
      },
      {
        type: "bold",
        name: "Reliability",
        key: "reliability",
      },
      {
        type: "bold",
        name: "Action",
        key: "action",
        visible: "no",
      },
    ],
    data: quoteResultData,
    selectedRowMetaData,
    config: {
      navigationPosition: "center",
      removeRowSelection: (i) => {
        window.selectedRow = window.selectedRow.filter(index => index !== i);
        setSelectedRowMetaData({
          selectedRow: window.selectedRow,
          data: {
            selectQuoteToViewSummary: "",
          },
        });
      },
      rowSelectionActive: true,
    },
  };
  const quoteConfig = useSelector((state) => state.quote);

  const getQuoteResults = async () => {
    let url = "api/getQuoteOpen";
    if (auth.isAuthenticated) {
      url = "api/getQuote"; 
    }
    try {
      const { data } = await shippingQuoteApiClient({
        method: "post",
        url: url,
        data: quoteConfig,
        headers: auth.isAuthenticated ? {
          Authorization: `Bearer ${auth.token}`,
        } : {}
      });
      setLoading(false);
      window.scrollTo({top: 0, behavior: "smooth"})
      if (!data.success) {
        setMsg(data.message);
      } else if (data.loads.length === 0) {
        setMsg("No matching shipments founds for this search.");
      }
      setSummaryData(data.summary);
      const quoteRes = data.loads.map((load, i) => {
        const transitPath = {
          type: "bus", //using this as default as no option forcarrier type
          value: load.carrierDescription,
          iconType:load.type,
          child: load.legs.map((leg) => {
            const legCf = {};
            legCf.type = leg.iconType;
            legCf.from = `${leg.origin || "-"}`;
            legCf.to = `${leg.destination || "-"}`;
            legCf.carrierName = leg.carrierName ;
            legCf.pickupDate = leg.scheduledPickupDate ;
            legCf.dropoffDate = leg.scheduledDeliveryDate;
            return legCf;
          }),
        };
        const cost = {
          total: `${load.cost}`,
          child: load.lineItemCharges.map((lineItemCharge) => {
            const lineItem = {};
            lineItem.charge = lineItemCharge.charge;
            lineItem.description = lineItemCharge.description;
            lineItem.type = lineItemCharge.type;
            return lineItem;

          }),
        };
        const doorService = load.doorService
          .split("_")
          .map((word) => word.toUpperCase())
          .join(" ");

        const delivery = load.deliveryDate.split("T")[0];
        const transit = `${load.transitTime} Days`;
        //const cost = `${load.cost}`;
        const reliability = `${
          load.reliability.value.toString() +
          " " +
          load.reliability.ratioType.toString()
        } on time`;

        const onTimeDelivery = `${load.onTimeDelivery.value} ${load.onTimeDelivery.ratioType}`;
        const onTimePickup = `${load.onTimePickup.value} ${load.onTimePickup.ratioType}`;
        const overAll = `${load.overAll.value} ${load.overAll.ratioType}`;
        const limitedLiability = load.limitedLiabilty || "";
        const limitedLiabilityUsed = load.limitedLiabilityUsed || "";

        const billOfLadingDetails = load.billOfLadingDetailsForUI;
        const billOfLadingCarrierID = billOfLadingDetails && billOfLadingDetails.carrierQuoteReferenceId ? billOfLadingDetails.carrierQuoteReferenceId : "N/A";
        const billOfLadingCarrierServiceDescription = billOfLadingDetails && billOfLadingDetails.carrierServiceDescription ? billOfLadingDetails.carrierServiceDescription : "N/A";

        const transitDetails = () => {
          const selectedMetaData = {
            limitedLiability: limitedLiability || "N/A",
            limitedLiabilityUsed: limitedLiabilityUsed || "N/A",
            billOfLadingCarrierID: billOfLadingCarrierID || "N/A",
            bOLCarrierServiceDescription: billOfLadingCarrierServiceDescription || "N/A"
          };

          let newSelectedRowMetaData = window.selectedRow ? [...window.selectedRow] : [];
          newSelectedRowMetaData.push(i);
          window.selectedRow = newSelectedRowMetaData;

          let newSelectedMetaData = window.selectedMetaData ? { ...window.selectedMetaData } : {};
          newSelectedMetaData[i] = selectedMetaData;
          window.selectedMetaData = newSelectedMetaData;

          setSelectedRowMetaData({
            selectedRow: newSelectedRowMetaData,
            data: selectedMetaData
          });
        };
        return {
          transitPath,
          doorService,
          delivery,
          transit,
          cost,
          reliability,
          onTimeDelivery,
          onTimePickup,
          overAll,
          transitDetails
        };
      });
      const quoteResultApiData = { 0: quoteRes };
      //   0: [
      //     {
      //       transitPath: {
      //         type: "flight",
      //         value: "Ward Flight (DWARD)",
      //         child: [
      //           {
      //             type: "truck",
      //             from: "Leg 1:23235",
      //             to: "07114::Ward Trucking",
      //           },
      //           {
      //             type: "ship",
      //             from: "Leg 1:23235",
      //             to: "07114::Ward Shipping",
      //           },
      //           {
      //             type: "flight",
      //             from: "Leg 1:23235",
      //             to: "07114::Ward Flying",
      //           },
      //         ],
      //       },
      //       doorService: "Door to Door",
      //       delivery: "24/04/2023",
      //       transit: "1 Day",
      //       cost: "$295.25",
      //       reliability: "55% on time",
      //     },
      //   ],
      // }; // we get this data from api call

      // now mapping the data feed and bind in pagination table
      Object.values(quoteResultApiData).forEach((page) => {
        page.forEach((record, i) => {
          Object.keys(record).forEach((key) => {
            let currentVal;
            switch (key) {
              case "transitPath":
                currentVal = record[key];
                record[key] = {
                  cellType: "transitPath",
                  value: currentVal,
                };
                break;

              case "doorService":
                currentVal = record[key];
                record[key] = {
                  cellType: "text",
                  value: currentVal,
                };
                break;
              case "delivery":
                currentVal = record[key];
                record[key] = {
                  cellType: "text",
                  value: currentVal,
                };
                break;
              case "transit":
                currentVal = record[key];
                record[key] = {
                  cellType: "text",
                  value: currentVal,
                };
                break;
              case "cost":
                currentVal = record[key];
                record[key] = {
                  cellType: "lineItemCharges",
                  value: currentVal,
                };
                break;
              case "reliability":
                currentVal = record[key];
                const value = parseInt(currentVal);
                let color;
                if (value >= 60) color = "#25B496";
                if (value < 60 && value >= 40) color = "#F9C80E";
                if (value < 40) color = "#E53E3E";
                record[key] = {
                  cellType: "colorBox",
                  value: currentVal,
                  color: color,
                };
                break;
              default:
                break;
            }
          });
          record.number = {
            cellType: "round-text",
            value: i + 1,
          };
          record.action = {
            cellType: "buttons",
            buttons: [
              {
                type: "edit",
                value: "Select",
                disabled: !data.bookingAllowed,
                cb: (e) => {
                  dispatcher(
                    modalActions.open({
                      modalType: "bookShipment",
                      modalData: { onSuccess: onSuccess, eQuoteData: data, loadDataId: i },
                    })
                  );
                },
              },
            ],
          };
        });
      });
      setQuoteResultData(quoteResultApiData);
    } catch (err) {
      setValidateQuote(false);
      console.error(err);
      // alert("Failed to Get Quotes, please try again later!");
      navigator(-1);
      setLoading(false);
    }
  };

  const calcRoute = (map, originPin, destinationPin) => {
    // startMark.setMap(map);
    let request = {
      origin: originPin,
      destination: destinationPin,
      travelMode: "DRIVING",
    }; 
    directionsServiceRef.current = new window.google.maps.DirectionsService();
    directionsServiceRef.current.route(request, function (response, status) {
      if (status === "OK") {
        directionsDisplayRef.current.setDirections(response);
      } else {
        console.error("directions request failed, status=" + status);
      }
    });
  };

  const calcInternational = (map, originPin, destinationPin) => {
    const new_map = new window.google.maps.Map(map);
    const bounds = new window.google.maps.LatLngBounds();
    
    const originMarker = new window.google.maps.Marker({
      position: originPin,
      map: map,
      label: "A",
    });
    
    const destinationMarker = new window.google.maps.Marker({
      position: destinationPin,
      map: map,
      label: "B"
    });

    const polyline = new window.google.maps.Polyline({
      path: [originPin, destinationPin],
      strokeColor: '#FF0000', // Customize the line color
      strokeOpacity: 1.0,
      strokeWeight: 2 // Customize the line thickness
    });



    originMarker.setMap(new_map);
    destinationMarker.setMap(new_map);
    polyline.setMap(new_map);
    bounds.extend(originPin);
    bounds.extend(destinationPin);

    // Add the polyline to the map

    new_map.fitBounds(bounds);
  }

  const expandSummary = () => {
    setViewSummary(true);
  }

  const collapseSummary = () => {
    setViewSummary(false);
    window.selectedRow = window.selectedRow.filter(index => index !== -1);
  }

  const onSuccess = () => {
    setMsg(msg + window.count++);
  }

  useEffect(() => {
    if (!isLoading) {
      if (!validateQuote) {
        setLoading(false);
        return;
      }
      const originPin = new window.google.maps.LatLng(
        quoteConfig.originGeometry.lat,
        quoteConfig.originGeometry.lng
      );
      const destinationPin = new window.google.maps.LatLng(
        quoteConfig.destinationGeometry.lat,
        quoteConfig.destinationGeometry.lng
      );
      directionsDisplayRef.current =
        new window.google.maps.DirectionsRenderer();
      mapRef.current = new window.google.maps.Map(mapDivRef.current, {
        center: originPin,
        zoom: 8,
      });
      directionsDisplayRef.current.setMap(mapRef.current);
      // calcRoute(mapDivRef.current, originPin, destinationPin);
      calcInternational(mapDivRef.current, originPin, destinationPin);
    }
  }, [isLoading]);

  useEffect(() => {
    if (quoteConfig===null || !quoteConfig.origin || !quoteConfig.destination) {
      // Redirect to "get-quote" if origin or destination data is empty
      navigator("/get-quote");
    } else {
      window.selectedRow = [];
      window.selectedBooking = [];
      window.count = 0;
      getQuoteResults();
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <div className="quote-result-container">
        <div className="quote-result-heading">
          <button className="go-back-btn" onClick={() => {window.selectedRow = []; navigator(-1);}}>
            <img src={BackIcon} alt="bi" />
            {platformView === "desktop" && <span>Go Back</span>}
          </button>
          <h2>GET QUOTE</h2>
        </div>

        <div className="navigation-map-container">
          <div className="navigation-map" ref={mapDivRef}>
            {/* <img src={GetQuoteImg} alt="di" /> */}
          </div>

          {!viewSummary && (
            <>
              <div
                onClick={expandSummary}
                className="summary-get-quote"
              >
                <span>summary</span>
                <img src={arrowheaddown} alt="arrowhead"></img>
              </div>
              <div className="border-color-map"></div>
            </>
          )}

          <div className="collapseable-tile">
            <div
              className={`dropdown-cell--map dropdown-cell ${
                viewSummary ? "open" : ""
              }`}
            >
              <div className="dropdown-cell-content ">
                {Object.entries(summaryData).map(
                  ([key, val], k) => {
                    if(val !=null){
                      return (
                          <div
                              key={key + k.toString()}
                              className={`row--${k.toString()} dropdown-row`}
                          >
                        <span>
                          <strong>
                            {key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, function (str) {
                                  return str.toUpperCase();
                                })} :
                          </strong>
                          {val ? val : "N/A"}
                        </span>
                            {/* <span>
                    <strong>On Time Pick Up:</strong>90%
                  </span> */}
                          </div>
                      );
                    } else {
                      return <div style={{display: 'none'}} />
                    }

                  }
                )}
              </div>
              <div
                className="close-dropdown close-dropdown--map"
                onClick={collapseSummary}
              >
                <span></span>
                <img src={arrowhead} alt="arrowHead"></img>
              </div>
            </div>
          </div>
        </div>
        <PaginationTable
          extraClasses={["p0", "quote-result-table"]}
          tableConfig={tableConfigrartion}
          msg={msg}
        />
      </div>
    );
  }
};

export default QuoteResult;
