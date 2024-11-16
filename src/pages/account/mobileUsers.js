import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import shippingQuoteApiClient from "../../adapters/restClient";
import "../../components/Account/account.css";
// import Loader from "../../components/HOC/Loader";
import PaginationTable from "../../components/Tables/PaginationTable";
import { modalActions } from "../../store/modal";
import { useNavigate } from "react-router-dom";

const MobileUsersPage = () => {
  const [msg, setMsg] = useState("");
  const [nubmerOfUsers, setNumberOfUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  // const [isLoading, setLoading] = useState(true);
  const auth = useSelector((state) => state.auth);
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const tableConfig = {
    colWidth: ["25%", "30%", "20%", "25%"],
    headers: [
      {
        type: "bold",
        name: "NUMBER",
        key: "number",
      },
      {
        type: "bold",
        name: "EMAIL",
        key: "email",
      },
      {
        type: "bold",
        name: "USER TYPE",
        key: "userType",
      },
      {
        type: "bold",
        name: "ACTION",
        key: "action",
      },
    ],
    data: userData,
    config: {
      rowSelectionActive: false,
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
        dispatcher(
          modalActions.open({
            modalType: "redirectUser",
            modalData: { redirect: () => navigate("/account") },
          })
        )
      }
    } catch (err) {
      console.error(err);
      // alert("Failed to get user details");
    }
  };

  const fetchUsersAccount = async () => {
    try {
      const pageLimit = 20;
      let pagelength = 0;
      let pageNumber = 0;
      const { data, status } = await shippingQuoteApiClient({
        method: "get",
        url: "/api/users/listAllAccounts",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setLoading(false);
      const { accounts, success, message } = data;
      if (!success) {
        throw new Error("Failed to get Users account list");
      }
      setNumberOfUsers(accounts.length);
      if (accounts.length === 0) setMsg("No users found.");

      // setLoading(false);
      const users = {};
      accounts.forEach((user) => {
        if (!users[pageNumber]) {
          users[pageNumber] = [];
        }
        users[pageNumber].push(user);
        pagelength++;
        if (pagelength >= pageLimit) {
          pagelength = 0;
          pageNumber++;
        }
      });
      Object.values(users).forEach((page) => {
        page.forEach((record, i) => {
          let recordIdentifier = null;
          let recordIdentifierKey = "email";
          Object.entries(record).forEach((entry) => {
            const [key, val] = entry;
            if (key === "email") {
              if (recordIdentifierKey === key) {
                recordIdentifier = val;
              }
              record["email"] = {
                value: val,
                cellType: "text",
              };
            }
            if (key === "userType") {
              if (recordIdentifierKey === key) {
                recordIdentifier = val;
              }
              record["userType"] = {
                value: val,
                cellType: "bold-text",
              };
            }
          });
          record.number = {
            value: i + 1,
            cellType: "round-text",
          };
          record.action = {
            cellType: "buttons",
            buttons: [
              {
                type: "edit",
                value: "Edit",
                cb: (e) => {
                  console.log(record.userType, recordIdentifier);
                  dispatcher(
                    modalActions.open({
                      modalType: "editUser",
                      modalData: {
                        email: recordIdentifier,
                        userType: record.userType.value,
                      },
                    })
                  );
                },
              },
              {
                type: "delete",
                value: "Delete",
                cb: (e) => {
                  dispatcher(
                    modalActions.open({
                      modalType: "deleteAccountUser",
                      modalData: { email: recordIdentifier },
                    })
                  );
                },
              },
            ],
          };
        });
      });
      setUserData(users);
    } catch (err) {
      console.error(err);
      if (err.response!=null && err.response.status!=null && err.response.status === 403) {
        // Handle 403 Forbidden error
        // For example, display an error message or redirect the user
        setNumberOfUsers(0);
        setMsg("You are not authorized to access this resource.");

      }
      // alert("Failed to get Users account list");
      // setLoading(false);
    }
  };

  useEffect(() => {
    if (!auth.token) {
      navigate("/login");
      return;
    }

    validateToken(auth.token);
    fetchUsersAccount();
  }, []);

  return (
    <div className="account-container">
      <div className="account-user-table-container account-user-table-container--mobile-view">
        <h2>Users Management</h2>
        {nubmerOfUsers > 0 ? (
          <PaginationTable tableConfig={tableConfig} hideHighLightRow={true} />
        ) : (
          <p
            style={{
              margin: "100px 20px 20px",
              fontSize: "2.3rem",
              color: "#0e3889",
              fontWeight: "600",
            }}
          >
            {msg}
          </p>
        )}
        {!loading && <div className="btn-tray">
          <button
            className="primary-theme-btn"
            onClick={(e) => {
              dispatcher(
                modalActions.open({
                  modalType: "addUser",
                })
              );
            }}
          >
            ADD NEW
          </button>
        </div>}
      </div>
    </div>
  );
  // }
};

export default MobileUsersPage;
