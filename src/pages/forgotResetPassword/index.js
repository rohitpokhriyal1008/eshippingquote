import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "../../components/ForgotNewPassword/forgotNewPassword.css";
import shippingQuoteApiClient from "../../adapters/restClient";

function ForgotResetPassword() {
    const [message, setMessage] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [errorField, setErrorField] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const navigator = useNavigate();

    const sumbitNewPaaword = async () => {
        if (!passwordRef.current.value || !confirmPasswordRef.current.value) {
            setMessage("Please fill all the fields.");
            setErrorField(true);
            return;
        } else if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            setMessage("Passwords don't match.");
            setErrorField(true);
            return;
        } else if (!userInfo.token || !userInfo.uid) {
            setMessage("Cannot found token.");
            return;
        }
        try {
            const { data } = await shippingQuoteApiClient({
                method: "post",
                url: "/api/users/forgotpassword-new-password",
                data: {
                    "token": userInfo.token,
                    "uid": userInfo.uid,
                    "newPassword": passwordRef.current.value,
                    "newPasswordConfirm": confirmPasswordRef.current.value
                },
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (data.passwordChanged) {
                setSuccessMsg("Password changed successfully");
                setTimeout(() => navigator("/login"), 3000);
            } else {
                setMessage(data.message);
            }

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const url = window.location.search;
        const tokenIndex = url.indexOf("token=");
        const uIdIndex = url.indexOf("uid=");
        const andIndex = url.indexOf("&");
        setUserInfo({
            token: url.substring(tokenIndex + 6, andIndex),
            uid: url.substring(uIdIndex + 4)
        })
    }, []);

    return (
        <div className="new-password-container">
            {successMsg ? <div className='successMsg'>{successMsg}</div> : <>
                {message && <p className="validation-message">{message}</p>}
                <div className="new-password-form">
                    <h2>New Password</h2>
                    <div className="form-field">
                        <input ref={passwordRef} placeholder="New Password" className={`li-i ${errorField && !passwordRef.current.value ? "field--invalid" : ""}`} type="password" />
                    </div>
                    <div className="form-field">
                        <input ref={confirmPasswordRef} placeholder="Confirm New Password" className={`li-i ${errorField && !confirmPasswordRef.current.value ? "field--invalid" : ""}`} type="password" />
                    </div>
                    <div className="form-field">
                        <button onClick={sumbitNewPaaword} className="primary-theme-btn">UPDATE</button>
                    </div>
                </div>
            </>}
        </div>
    )
}

export default ForgotResetPassword;