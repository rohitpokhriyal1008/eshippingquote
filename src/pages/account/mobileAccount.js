import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import shippingQuoteApiClient from "../../adapters/restClient";
import "../../components/Account/account.css";
import { modalActions } from "../../store/modal";

const MobileAccountPage = () => {
  const dispatcher = useDispatch();
  const [msgColor, setMsgColor] = useState("");
  const auth = useSelector((state) => state.auth);
  const accountData = JSON.parse(localStorage.getItem("accountData"));
  const initialLoading = Boolean(accountData) ? false : true;
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(initialLoading);

  const [accountDetails, setAccountDetails] = useState(accountData || {
    incompleteAccountDetails: false,
    name: "",
    phoneNumber: "",
    email: "",
    companyName: "",
    userType: "",
  });

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
      // if (data.incompleteAccountDetails) {
      //   dispatcher(
      //     modalActions.open({
      //       modalType: "redirectUser",
      //       modalData: { redirect: () => navigator("/account") },
      //     })
      //   )
      // }
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

  const updateAccountDetails = async () => {
    // window.scrollTo({ top: 80, behavior: "smooth" });

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
        window.scrollTo({top: 0, behavior: "smooth"})
        throw new Error("Failed to update account details.");

      }
      window.scrollTo({top: 0, behavior: "smooth"})
      localStorage.setItem("accountData", JSON.stringify(data.myAccountResponse));
      setAccountDetails(data.myAccountResponse);
      setMsg("Account Details Updated Successfully");
      setMsgColor('green');
      // alert("Account Details Updated Successfully");
    } catch (err) {
      console.error(err);
      // alert("Failed to update the account details");
    }
  };

  useEffect(() => {
    if (!auth.token) {
      navigate("/login");
      return;
    }

    validateToken(auth.token);
    fetchAccountDetails();
  }, []);

  return (
    <div className="account-container">
      <div className="account-update-container account-update-container--mobile-view">
        {loading && <div
            style={{
              height: "1000px",

            }}
        >
        </div>}
        {!loading && <div className="account-form">
          <h2>Account</h2>
          <p
            style={{
              minHeight: "2rem",
              color: msgColor || "var(--primary-theme-color)",
              fontWeight: "600",
            }}
          >
            {msg ? "Account updated Successfully" : null}
          </p>
          <div className="form-field">
            <input
              onChange={(e) => setAccountDetailsValue("email", e.target.value)}
              value={accountDetails.email}
              type="email"
              disabled
              placeholder="email"
            />
          </div>
          <div className="form-field">
            <input
              onChange={(e) => setAccountDetailsValue("name", e.target.value)}
              value={accountDetails.name}
              type="text"
              placeholder="First Name + Last Name"
            />
          </div>
          <div className="form-field">
            <input
                onChange={(e) =>
                    setAccountDetailsValue("userType", e.target.value)
                }
                value={accountDetails.userType}
                type="text"
                disabled
                placeholder="User Type"
            />
          </div>
          <div className="form-field">
            <input
              onChange={(e) =>
                setAccountDetailsValue("companyName", e.target.value)
              }
              value={accountDetails.companyName}
              type="text"
              disabled
              placeholder="Company Name"
            />
          </div>

          <div className="form-field">
            <input
              onChange={(e) =>
                setAccountDetailsValue("phoneNumber", e.target.value)
              }
              value={accountDetails.phoneNumber}
              type="tel"
              placeholder="Phone Number (10 Digit)"
            />
          </div>

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
    </div>
  );
};

export default MobileAccountPage;
