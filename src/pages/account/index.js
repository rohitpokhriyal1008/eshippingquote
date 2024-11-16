import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import shippingQuoteApiClient from "../../adapters/restClient";
import "../../components/Account/account.css";
// import Loader from "../../components/HOC/Loader";
import PaginationTable from "../../components/Tables/PaginationTable";
import { modalActions } from "../../store/modal";
import BookLoadModal from "../../components/Modal/BookLoadModal";

const AccountPage = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [msgColor, setMsgColor] = useState("");
  const [nubmerOfUsers, setNumberOfUsers] = useState(0);

  const accountData = JSON.parse(localStorage.getItem("accountData"));
  const initialLoading = Boolean(accountData) ? false : true;
  const [isLoading, setLoading] = useState(initialLoading);
  const auth = useSelector((state) => state.auth);
  const dispatcher = useDispatch();
  const [userData, setUserData] = useState({});
  const [accountDetails, setAccountDetails] = useState(accountData || {
    incompleteAccountDetails: false,
    name: "",
    phoneNumber: "",
    email: "",
    companyName: "",
    userType: "",
  });
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
      if (data.incompleteAccountDetails) navigate("/account");
    } catch (err) {
      console.error(err);
    }
  };

  const setAccountDetailsValue = (key, value) => {
    setAccountDetails((prev) => {
      prev[key] = value;
      return { ...prev };
    });
  };

  const fetchAccountDetails = async () => {
    if (Boolean(accountData)) return;
    try {
      const { data: accountData } = await shippingQuoteApiClient({
        method: "get",
        url: "/api/users/myAccount",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      localStorage.setItem("accountData", JSON.stringify(accountData));
      setLoading(false);
      setAccountDetails(accountData);
    } catch (err) {
      console.error(err);
    }
  };
  // const fetchUsersAccount = async () => {
  //   try {
  //     const pageLimit = 5;
  //     let pagelength = 0;
  //     let pageNumber = 0;
  //     const { data } = await shippingQuoteApiClient({
  //       method: "get",
  //       url: "/api/users/listAllAccounts",
  //       headers: {
  //         Authorization: `Bearer ${auth.token}`,
  //       },
  //     });
  //     const { accounts, success, message } = data;
  //     if (!success) {
  //       throw new Error("Failed to get Users account list");
  //     }
  //     setNumberOfUsers(accounts.length);
  //     if (accounts.length === 0) setMsg("No users found");

  //     // setLoading(false);
  //     const users = {};
  //     accounts.forEach((user) => {
  //       if (!users[pageNumber]) {
  //         users[pageNumber] = [];
  //       }
  //       users[pageNumber].push(user);
  //       pagelength++;
  //       if (pagelength >= pageLimit) {
  //         pagelength = 0;
  //         pageNumber++;
  //       }
  //     });
  //     Object.values(users).forEach((page) => {
  //       page.forEach((record, i) => {
  //         let recordIdentifier = null;
  //         let recordIdentifierKey = "email";
  //         Object.entries(record).forEach((entry) => {
  //           const [key, val] = entry;
  //           if (key === "email") {
  //             if (recordIdentifierKey === key) {
  //               recordIdentifier = val;
  //             }
  //             record["email"] = {
  //               value: val,
  //               cellType: "text",
  //             };
  //           }
  //           if (key === "userType") {
  //             if (recordIdentifierKey === key) {
  //               recordIdentifier = val;
  //             }
  //             record["userType"] = {
  //               value: val,
  //               cellType: "bold-text",
  //             };
  //           }
  //         });
  //         record.number = {
  //           value: i + 1,
  //           cellType: "round-text",
  //         };
  //         record.action = {
  //           cellType: "buttons",
  //           buttons: [
  //             {
  //               type: "edit",
  //               value: "Edit",
  //               cb: (e) => {
  //                 dispatcher(
  //                   modalActions.open({
  //                     modalType: "editUser",
  //                     modalData: { email: recordIdentifier },
  //                   })
  //                 );
  //               },
  //             },
  //             {
  //               type: "delete",
  //               value: "Delete",
  //               cb: (e) => {
  //                 dispatcher(
  //                   modalActions.open({
  //                     modalType: "deleteUser",
  //                     modalData: { email: recordIdentifier },
  //                   })
  //                 );
  //               },
  //             },
  //           ],
  //         };
  //       });
  //     });
  //     setUserData(users);
  //   } catch (err) {
  //     console.error(err);
  //     // setLoading(false);
  //   }
  // };
  const updateAccountDetails = async () => {
    // window.scrollTo({ top: 100, behavior: "smooth" });

    try {
      const { data } = await shippingQuoteApiClient({
        method: "post",
        url: "/api/users/editAccountDetails",
        data: accountDetails,
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (!data.success) {
        setMsg(data.message);
        window.scrollTo({top: 0, behavior: "smooth"})
        setMsgColor('red');
      } else {
        window.scrollTo({top: 0, behavior: "smooth"})
        localStorage.setItem("accountData", JSON.stringify(data.myAccountResponse));
        setAccountDetails(data.myAccountResponse);
        setMsg("Account Details Updated Successfully");
        setMsgColor('green');
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (!auth.token) {
      navigate("/login");
      return;
    }

    validateToken(auth.token);
    //loading the details of user account
    fetchAccountDetails();
    // fetchUsersAccount();
  }, []);
  // if (isLoading) {
  //   return <Loader />;
  // } else {
  return (
    <>
      {/* <BookLoadModal></BookLoadModal> */}
      <div className="account-container">
        <div className="account-update-container">
          {isLoading && <div
              style={{
                height: "1000px",

              }}
          >
          </div>}
          {!isLoading && <div className="account-form">
            <h2>Account</h2>
            <p
              style={{
                minHeight: "2rem",
                color: msgColor || "var(--primary-theme-color)",
                fontWeight: "600",
              }}
            >
              {msg || null}
            </p>
            <div className="form-field">
              <span>Email</span>
              <input
                onChange={(e) =>
                  setAccountDetailsValue("email", e.target.value)
                }
                value={accountDetails.email}
                type="email"
                disabled
              />
            </div>
            <div className="form-field">
              <span>First Name + Last Name</span>
              <input
                onChange={(e) => setAccountDetailsValue("name", e.target.value)}
                value={accountDetails.name}
                type="text"
              />
            </div>
            <div className="form-field">
              <span>User Type</span>
              <input
                  onChange={(e) =>
                      setAccountDetailsValue("userType", e.target.value)
                  }
                  value={accountDetails.userType}
                  type="text"
                  disabled
              />
            </div>
            <div className="form-field">
              <span>Company Name</span>
              <input
                onChange={(e) =>
                  setAccountDetailsValue("companyName", e.target.value)
                }
                value={accountDetails.companyName}
                type="text"
                disabled
              />
            </div>
            <div className="form-field">
              <span>Phone Number (10 Digit)</span>
              <input
                onChange={(e) =>
                  setAccountDetailsValue("phoneNumber", e.target.value)
                }
                value={accountDetails.phoneNumber}
                type="tel"
              />
            </div>
            {/* <div className="form-field">
            <span>User Name</span>
            <input  onChange={(e)=>setAccountDetailsValue("email",e.target.value)}  value={accountDetails.name} type="text" />
          </div> */}
            <div className="form-field">
              <button
                className="primary-theme-btn"
                onClick={updateAccountDetails}
              >
                UPDATE
              </button>
            </div>
            <div className="form-field">
              <button
                onClick={(e) => {
                  dispatcher(
                    modalActions.open({
                      modalType: "deleteUser",
                    })
                  );
                }}
                className="primary-theme-btn red-theme"
              >
                DELETE ACCOUNT
              </button>
            </div>
          </div>}
        </div>
        {/* <div className="account-user-table-container">
          <h2>Users</h2>
          {nubmerOfUsers > 0 ? (
            <PaginationTable tableConfig={tableConfig} />
          ) : (
            <p
              style={{
                margin: "10px 0",
                fontSize: "1.4rem",
                color: "#0e3889",
                fontWeight: "600",
              }}
            >
              {msg}
            </p>
          )}
          <div className="btn-tray">
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
          </div>
        </div> */}
      </div>
    </>
  );
};
// };

export default AccountPage;
