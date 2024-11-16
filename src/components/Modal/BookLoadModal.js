import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { modalActions } from "../../store/modal";

import BookingForm from "../BookingForm";
import LTLItemContainer from "../BookingItemContainer/LTLItemContainer";
import FCLItemContainer from "../BookingItemContainer/FCLItemContainer";

import ArrowHead from "../../assets/icons/right-arrow.svg";
import CancelIcon from "../../assets/icons/cancel.svg";
import shippingQuoteApiClient from "../../adapters/restClient";

import "./modal.css";

const BookLoadModal = (props) => {
    const { modalData } = props;
    const { commodites, searchQuery, internationalShipment, loads, referenceKey, ltl, fcl } = modalData.eQuoteData;
    const loadData = loads[modalData.loadDataId];
    const { routeNumber, bookingJSON } = loadData;
    const { origin, destination, loadingDate } = searchQuery;

    const auth = useSelector((state) => state.auth);
    const dispatcher = useDispatch();
    const mandatoryField = ["address1", "city", "state", "country", "name", "postal", "email", "phone", "openTime", "closeTime", "shippingDay", "shipmentSpecialInstructions"];

    const [inputFormData, setInputFormData] = useState({
        shipper_address1: null,
        shipper_address2: null,
        shipper_city: null,
        shipper_state: null,
        shipper_country: null,
        shipper_name: null,
        shipper_postal: null,
        shipper_email: null,
        shipper_fax: null,
        shipper_phone: null,
        shipper_instruction: null,
        shipper_openTime: null,
        shipper_closeTime: null,
        consignee_address1: null,
        consignee_address2: null,
        consignee_city: null,
        consignee_state: null,
        consignee_country: null,
        consignee_name: null,
        consignee_postal: null,
        consignee_email: null,
        consignee_fax: null,
        consignee_phone: null,
        consignee_instruction: null,
        consignee_openTime: null,
        consignee_closeTime: null,
        importRecord_address1: null,
        importRecord_address2: null,
        importRecord_city: null,
        importRecord_state: null,
        importRecord_country: null,
        importRecord_name: null,
        importRecord_postal: null,
        importRecord_email: null,
        importRecord_fax: null,
        importRecord_phone: null,
        exportRecord_address1: null,
        exportRecord_address2: null,
        exportRecord_city: null,
        exportRecord_state: null,
        exportRecord_country: null,
        exportRecord_name: null,
        exportRecord_postal: null,
        exportRecord_email: null,
        exportRecord_fax: null,
        exportRecord_phone: null,
        origin: origin,
        destination: destination,
        shippingDay: loadingDate,
        shipmentSpecialInstructions: "",
    })

    const [commoditesDetails, setCommoditesDetails] = useState(() => {
        const commodityList = JSON.parse(JSON.stringify(commodites));
        commodityList.forEach(element => {
            element.value = {
                "unit": "USD",
                "value": element.value
            };
        });
        return commodityList;
    });
    const [bookingLoading, setBookingLoading] = useState(false);
    const [formSubmissionTried, setFormSubmissionTried] = useState(false);
    const [showDetails, setShowDetails] = useState([]);
    const [error, setError] = useState("");

    const bookShipment = async () => {
        const {
            shipper_address1,
            shipper_address2,
            shipper_city,
            shipper_state,
            shipper_country,
            shipper_name,
            shipper_postal,
            shipper_email,
            shipper_fax,
            shipper_phone,
            shipper_instruction,
            shipper_openTime,
            shipper_closeTime,
            consignee_address1,
            consignee_address2,
            consignee_city,
            consignee_state,
            consignee_country,
            consignee_name,
            consignee_postal,
            consignee_email,
            consignee_fax,
            consignee_phone,
            consignee_instruction,
            consignee_openTime,
            consignee_closeTime,
            importRecord_address1,
            importRecord_address2,
            importRecord_city,
            importRecord_state,
            importRecord_country,
            importRecord_name,
            importRecord_postal,
            importRecord_email,
            importRecord_fax,
            importRecord_phone,
            exportRecord_address1,
            exportRecord_address2,
            exportRecord_city,
            exportRecord_state,
            exportRecord_country,
            exportRecord_name,
            exportRecord_postal,
            exportRecord_email,
            exportRecord_fax,
            exportRecord_phone,
            shippingDay,
            shipmentSpecialInstructions
        } = inputFormData;

        if(!validateMandatoryField()) {
            setError("Mandatory Consignee address details can't be empty.");
            return;
        }

        const dataToSend = {
            referenceKey,
            routeNumber: routeNumber,
            shipper: {
                addressLine: {
                    addressline1: shipper_address1,
                    addressline2: shipper_address2,
                    city: shipper_city,
                    state: shipper_state,
                    name: shipper_name,
                    postal: shipper_postal,
                    country: shipper_country
                },
                openHours: shipper_openTime,
                closeHours: shipper_closeTime,
                contact: {
                    email: shipper_email,
                    fax: shipper_fax,
                    name: shipper_name,
                    phoneNumber: shipper_phone
                },
                ein: "EIN123",
                instructions: shipper_instruction,
                poNumber: "PO123"
            },
            consignee: {
                addressLine: {
                    addressline1: consignee_address1,
                    addressline2: consignee_address2,
                    city: consignee_city,
                    state: consignee_state,
                    name: consignee_name,
                    postal: consignee_postal,
                    country: consignee_country
                },
                openHours: consignee_openTime,
                closeHours: consignee_closeTime,
                contact: {
                    email: consignee_email,
                    fax: consignee_fax,
                    name: consignee_name,
                    phoneNumber: consignee_phone
                },
                instructions: consignee_instruction
            },
            commodites: commoditesDetails,
            bookingJSON: bookingJSON || null,
            destinationAgent: null,
            ratedContainerUpdates: null,
            ratedItemUpdates: null,
            shipDay: shippingDay,
            shipmentSpecialInstructions: shipmentSpecialInstructions,
            testingVariable: true
        }
        if (showDetails.includes(2)) {
            dataToSend["importerOfRecord"] = {
                addressLine: {
                    addressline1: importRecord_address1,
                    addressline2: importRecord_address2,
                    city: importRecord_city,
                    state: importRecord_state,
                    name: importRecord_name,
                    postal: importRecord_postal,
                    country: importRecord_country
                },
                contact: {
                    email: importRecord_email,
                    fax: importRecord_fax,
                    name: importRecord_name,
                    phoneNumber: importRecord_phone
                },
                ein: "EIN789"
            };
        }
        if (showDetails.includes(1)) {
            dataToSend["exporterOfRecord"] = {
                addressLine: {
                    addressline1: exportRecord_address1,
                    addressline2: exportRecord_address2,
                    city: exportRecord_city,
                    state: exportRecord_state,
                    name: exportRecord_name,
                    postal: exportRecord_postal,
                    country: exportRecord_country
                },
                contact: {
                    email: exportRecord_email,
                    fax: exportRecord_fax,
                    name: exportRecord_name,
                    phoneNumber: exportRecord_phone
                },
                ein: "EIN789"
            }
        }

        const url = "/api/bookShipment";
        setBookingLoading(true);
        setFormSubmissionTried(true);
        try {
            const { data } = await shippingQuoteApiClient({
                method: "post",
                url: url,
                data: dataToSend,
                headers: auth.isAuthenticated ? {
                    Authorization: `Bearer ${auth.token}`,
                } : {}
            });
            if (data.successfull) {
                const selectedBooking = window.selectedBooking ?? [];
                window.selectedBooking = [...selectedBooking, modalData.loadDataId];
                modalData.onSuccess();
                dispatcher(
                    modalActions.open({
                        modalType: "bookingSuccess",
                        modalData: { closeBookingModal: () => props.closeModal(), successMsg: data.message },
                    })
                );
            } else {
                setError(data.message);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setBookingLoading(false);
        }
    }

    const updateForm = e => {
        setInputFormData({ ...inputFormData, [e.target.name]: e.target.value })
    }

    const updateCommodity = (e, index) => {
        let newArray = [...commoditesDetails];
        if (e.target.name === "value") {
            newArray[index][e.target.name] = {
                "unit": "USD",
                "value": e.target.value
            }
        } else {
            newArray[index][e.target.name] = e.target.value;
        }
        setCommoditesDetails(newArray);
    }

    const toggleCheckbox = (id) => {
        if (showDetails.includes(id)) setShowDetails(showDetails.filter(i => i !== id));
        else setShowDetails([...showDetails, id]);
    }

    const checkMandatoryField = (name) => {
        if (mandatoryField.includes(name)) return true;
    }

    const validateMandatoryField = () => {
        let validationError = false;
        Object.keys(inputFormData).every(field => {
            const fieldData = field.indexOf("_") > -1 ? field.split("_") : ["", field];
            const preventCheck = [];
            if (!showDetails.includes(1)) preventCheck.push("exportRecord");
            if (!showDetails.includes(2)) preventCheck.push("importRecord");
            if (!preventCheck.includes(fieldData[0]) && checkMandatoryField(fieldData[1]) && !inputFormData[field]) {
                validationError = true;
                return false;
            }
            return true;
        })
        commodites.every(item => {
            if (!item.description) {
                validationError = true;
                return false;
            }
            return true;
        })
        return validationError ? false : true;        
    }

    const getCurrentDate = () => {
        // Date object
        const date = new Date();
        let currentDay = String(date.getDate()).padStart(2, '0');
        let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
        let currentYear = date.getFullYear();
        // we will display the date as DD-MM-YYYY 
        let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
        return currentDate;
    }

    const renderBookingForm = () => {
        const width = window.innerWidth > 0 ? window.innerWidth : window.screen.width;
        if (width > 1024) {
            return (
                <div>
                    <div className="booking-modal--items">
                        <BookingForm name="shipper" shortName={"Shipper"} inputFormData={inputFormData} updateForm={updateForm} formSubmissionTried={formSubmissionTried} error={error} />
                        <BookingForm name="consignee" shortName={"Consignee"} inputFormData={inputFormData} updateForm={updateForm} formSubmissionTried={formSubmissionTried} error={error} />
                    </div>

                    {internationalShipment && <div className="booking-modal--items booking-modal--record">
                        <BookingForm name="exportRecord" shortName="Exporter of Record" showHeader inputFormData={inputFormData} updateForm={updateForm} formSubmissionTried={formSubmissionTried} error={error} showDetails={showDetails} toggleCheckbox={toggleCheckbox} />
                        <BookingForm name="importRecord" shortName="Importer of Record" showHeader inputFormData={inputFormData} updateForm={updateForm} formSubmissionTried={formSubmissionTried} error={error} showDetails={showDetails} toggleCheckbox={toggleCheckbox} />
                    </div>}
                </div>
            )
        } else {
            return (
                <div>
                    <div className="booking-modal--items">
                        <BookingForm name="shipper" shortName={"Shipper"} inputFormData={inputFormData} updateForm={updateForm} formSubmissionTried={formSubmissionTried} error={error} />
                        <BookingForm name="exportRecord" shortName="Exporter of Record" showHeader inputFormData={inputFormData} updateForm={updateForm} formSubmissionTried={formSubmissionTried} error={error} showDetails={showDetails} toggleCheckbox={toggleCheckbox} style={{ marginTop: '1rem' }} />
                    </div>

                    {internationalShipment && <div className="booking-modal--items booking-modal--record">
                        <BookingForm name="consignee" shortName={"Consignee"} inputFormData={inputFormData} updateForm={updateForm} formSubmissionTried={formSubmissionTried} error={error} />
                        <BookingForm name="importRecord" shortName="Importer of Record" showHeader inputFormData={inputFormData} updateForm={updateForm} formSubmissionTried={formSubmissionTried} error={error} showDetails={showDetails} toggleCheckbox={toggleCheckbox} style={{ marginTop: '1rem' }} />
                    </div>}
                </div>
            )
        }
    }

    return (
        <div className="modal-content booking-modal">
            <span className="close" onClick={() => !bookingLoading && props.closeModal()}>
                <img
                    style={{ height: "20px", width: "20px", opacity: bookingLoading ? .5 : 1 }}
                    src={CancelIcon}
                    alt="ci"
                />
            </span>

            <h4>Do you want to book the load?</h4>

            <div className="book-modal--r1">
                <div className="form-field">
                    <span>Origin</span>
                    <input disabled type="text" value={origin} />
                </div>

                <span className="right-arrow">
                    <img
                        style={{ height: "20px", width: "20px" }}
                        src={ArrowHead}
                        alt="ci"
                    />
                </span>

                <div className="form-field">
                    <span>Destination</span>
                    <input disabled type="text" value={destination} />
                </div>
            </div>

            {ltl && <LTLItemContainer commodites={commoditesDetails} inputFormData={inputFormData} updateForm={updateCommodity} error={error} />}
            {fcl && <FCLItemContainer commodites={commoditesDetails} inputFormData={inputFormData} updateForm={updateCommodity} error={error} />}

            {/* ///////////////////////////////////////////////// */}

            <div className="extra-details">
                <div className="shipping-day-wrapper">
                    <div>Shipping Day*:</div>
                    <input type="date" className={`li-i ${!inputFormData.shippingDay ? "field--invalid" : ""}`} min={getCurrentDate()} placeholder="DD/MM/YYYY" name={"shippingDay"} value={inputFormData.shippingDay} onChange={e => updateForm(e)} />
                </div>

                <div className="shipping-type-wrapper">
                    <div>Shipping Type:</div>
                    <div className="checkbox-options">
                        {!internationalShipment && <div className="checkbox-shipment domestic-shipment">
                            <span className={`custom-checkbox checked shipment-checkbox`}></span>
                            <span className="shipment-type">Domestic Shipment</span>
                        </div>}
                        {internationalShipment && <div className="checkbox-shipment international-shipment">
                            <span className={`custom-checkbox checked shipment-checkbox`}></span>
                            <span className="shipment-type">International Shipment</span>
                        </div>}
                    </div>
                </div>
            </div>

            {renderBookingForm()}

            {/* ////////////////////////////////////////////////// */}

            <div className="booking-modal--addons">
                <div className="booking-modal--addons-time">
                    <div className="form-field form-field--special">
                        <span>Shipment special instructions</span>
                        <span>:</span>
                        <input type="text" className={`li-i ${error && !inputFormData.shipmentSpecialInstructions ? "field--invalid" : ""}`} placeholder="Please do not shake" value={inputFormData.shipmentSpecialInstructions} name="shipmentSpecialInstructions" onChange={e => updateForm(e)} />
                    </div>
                </div>
            </div>

            {error && <div className="error-msg">{error}</div>}

            <div className="btn-tray">
                <button className="primary-theme-btn" onClick={() => bookShipment()}>
                    {bookingLoading && (
                        <FontAwesomeIcon className="login-spinner" icon={faSpinner} />
                    )}
                    Book
                </button>
                <button
                    className="secondary-theme-btn"
                    style={{ color: "black", opacity: bookingLoading ? .5 : 1 }}
                    onClick={props.closeModal}
                    disabled={bookingLoading}
                >
                    CANCEL
                </button>
            </div>
        </div>
    );
};

export default BookLoadModal;
