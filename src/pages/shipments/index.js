import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import shippingQuoteApiClient from "../../adapters/restClient";
import { modalActions } from "../../store/modal";
import Loader from "../../components/HOC/Loader";
import "../../components/Shipments/shipments.css";
import { useNavigate } from "react-router-dom";
import PaginationTable from "../../components/Tables/PaginationTable";
const ShipmentsPage = () => {
  // const [isLoading, setLoading] = useState(true);
  const dispatcher = useDispatch(); 
  const navigate = useNavigate();
  const [tableLength, setTableLength] = useState(0);
  const [message, setMessage] = useState("");
  const [shipmentsData, setShipmentsData] = useState({});
  const auth = useSelector((state) => state.auth);
  const tableConfigrartion = {
    colWidth: ["5%", "10%", "5%", "15%", "25%", "20%", "10%", "10%"],
    headers: [
      {
        type: "bold",
        name: "Number",
        key: "number",
        visible: "no",
      },
      {
        type: "bold",
        name: "Shipment ID",
        key: "shipmentId",
      },
      {
        type: "bold",
        name: "Type",
        key: "type",
      },
      {
        type: "bold",
        name: "Route",
        key: "shipment",
      },
      {
        type: "bold",
        name: "Legs",
        key: "shipmentLegs",
      },

      {
        type: "bold",
        name: "Schedule",
        key: "schedule",
      },
      {
        type: "bold",
        name: "Booked By",
        key: "bookedBy",
      },
      {
        type: "bold",
        name: "Status",
        key: "status",
      },

    ],
    data: shipmentsData,
    config: {
      navigationPosition: "center",
    },
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

      if (!data.tokenValidity) navigate("/login");
      if (data.incompleteAccountDetails) {
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
        modalData: { redirect: () => navigate("/account") },
      })
    )
  }

  const getAllShipments = async () => {
    try {
      const { data } = await shippingQuoteApiClient({
        method: "get",
        url: "/api/listAllShipments",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setTableLength(data.shipments.length);
      if (data.shipments.length === 0) {
        const backendMessage = data.message;

        setMessage(backendMessage || "Please check back later for available shipments.");
      }
      // setLoading(false);
      if (!data.success) {
        throw new Error("Failed to get the shipments.");
      }
      let shipmentsApiData = data.shipments.map((shipmentItem) => {
        const shipmentId = shipmentItem.shipmentId;
        const type = shipmentItem.type;
        const shipment = shipmentItem.shipment;
        const shipmentLegs = {
          type: "bus",
          value: `${shipment}`,
          child: shipmentItem.shipmentLegs.map((leg) => {
            return {
              type: "",
              from: leg.pickup,
              to: `${leg.delivery} (${leg.signedBy}) ${leg.status}`,
            };
          }),
        };
        const schedule = shipmentItem.schedule;
        const status = shipmentItem.status;
        const bookedBy = shipmentItem.bookedBy;

        return {
          shipmentId,
          type,
          shipment,
          shipmentLegs,
          schedule,
          bookedBy,
          status,

        };
      });
      shipmentsApiData = { 0: shipmentsApiData };
      Object.values(shipmentsApiData).forEach((page) => {
        page.forEach((record, i) => {
          Object.keys(record).forEach((key) => {
            let currentVal;
            switch (key) {
              case "shipmentId":
                currentVal = record[key];
                record[key] = {
                  cellType: "link-text",
                  value: currentVal,
                };
                break;
              case "type":
                currentVal = record[key];
                record[key] = {
                  cellType: "text",
                  value: currentVal,
                };
                break;
              case "shipment":
                currentVal = record[key];
                record[key] = {
                  cellType: "text",
                  value: currentVal,
                };
                break;
              case "shipmentLegs":
                currentVal = record[key];
                record[key] = {
                  cellType: "transitPath",
                  value: currentVal,
                };
                break;
              case "schedule":
                currentVal = record[key];
                record[key] = {
                  cellType: "text",
                  value: currentVal,
                };
                break;
              case "bookedBy":
                currentVal = record[key];
                record[key] = {
                  cellType: "text",
                  value: currentVal,
                };
                break;
              case "status":
                currentVal = record[key];
                record[key] = {
                  cellType: "colorBox",
                  value: currentVal,
                  color: currentVal === "Delivered" ? "#25B496" : "#FFA945",
                  textColor: currentVal === "Delivered" ? "#ffffff" : "#000",
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
        });
      });
      setShipmentsData(shipmentsApiData);
    } catch (err) {
      console.error(err);
      // setLoading(false);

      // alert("Failed to get all shipments");
    }
  };

  useEffect(() => {
    if (!auth.token) {
      navigate("/login");
      return;
    }

    validateToken(auth.token);
    getAllShipments();
    // const shipmentsDataApiData = {
    //   0: [
    //     {
    //       shipmentId: "9MD-1344",
    //       type: "xyz",
    //       shipment: "Queens, NYC",
    //       shipmentLegs: {
    //         type: "bus",
    //         value: "xyz",
    //         child: [
    //           {
    //             from: "origin",
    //             to: "destination (shipped)",
    //             type: "",
    //           },
    //           {
    //             from: "origin",
    //             to: "destination (shipped)",
    //             type: "",
    //           },
    //           {
    //             from: "origin",
    //             to: "destination (shipped)",
    //             type: "",
    //           },
    //         ],
    //       },
    //       schedule: "picked up at vblah bla ",
    //       status: "Delivered",
    //     },
    //   ],
    // };
  }, []);
  // if (isLoading) {
  //   return <Loader />;
  // }
  return (
    <div className="shipments-container">
      <h2>SHIPMENTS</h2>
      {tableLength > 0 ? (
        <PaginationTable
          extraClasses={["p0", "shipments-table"]}
          tableConfig={tableConfigrartion}
        />
      ) : (
        <p
          style={{
            margin: "100px 20px 20px 20px ",
            fontSize: "2.3rem",
            color: "#0e3889",
            fontWeight: "500",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default ShipmentsPage;
