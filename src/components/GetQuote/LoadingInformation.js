import React, { useState } from "react";
import "./getQuote.css";
import CalendarIcon from "../../assets/icons/calendar.svg";
import DatePicker from "react-date-picker";
import { useDispatch } from "react-redux";
import { quoteActions } from "../../store/quote";
import PostalSearch from "./PostalSearch";
import { useSelector } from "react-redux";

const LoadingInformation = (props) => {
  const [valid, setValid] = useState(true);
  const quoteConfig = {...window.quoteConfig};
  const [loadingDate, setLoadingDate] = useState(quoteConfig?.originalDate || null);
  const { shipmentType } = useSelector((state) => state.quote);

  const dispatcher = useDispatch();
  const platformView = useSelector(
    (state) => state.platformView.renderViewType
  );

  const blurHandler = () => {
    if (loadingDate) {
      setValid(true);
      props.setIsLoadingDate(true);
    } else setValid(false);
  };

  const writeLoadingDate = (date) => {
    if(!date) return;
    setLoadingDate(date);
    const quoteConfig = window?.quoteConfig || {};
    window.quoteConfig = { ...quoteConfig, originalDate: date };
    date = date.toISOString().split("T")[0];
    dispatcher(quoteActions.writeKey({ key: "loadingDate", value: date }));
  };
  const writeOrigin = (postalCode) => {
    dispatcher(
      quoteActions.writeKey({
        key: "origin",
        value: { country: "US", postal: postalCode },
      })
    );
  };
  const writeDestination = (postalCode) => {
    dispatcher(
      quoteActions.writeKey({
        key: "destination",
        value: { country: "US", postal: postalCode },
      })
    );
  };

  let maxDate = new Date("02 15 2100");
  let dt = new Date();
  if (shipmentType === "fcl") maxDate = new Date(dt.setDate(dt.getDate() + 6));

  return (
    <div className="loading-information">
      <div className="loading-information-loading-date">
        {platformView === "desktop" && <span>Pickup Date</span>}
        <div
          className={`date-picker-container ${
            valid && props.isLoadingDate ? "" : "field--invalid"
          }`}
        >
          <DatePicker
            clearIcon={false}
            className="date-picker-style"
            calendarIcon={
              <img
                style={{ width: "27px", height: "27px" }}
                src={CalendarIcon}
                alt="IC"
              />
            }
            dayPlaceholder="DD"
            monthPlaceholder="MM"
            yearPlaceholder="YYYY"
            dateFormat="dd/MM/yyyy"
            onChange={writeLoadingDate}
            value={loadingDate}
            onBlur={blurHandler}
            minDate={new Date()}
            maxDate={maxDate}
          />
        </div>
      </div>
      <PostalSearch
        isFilled={props.isOrigin}
        setIsFilled={props.setIsOrigin}
        configKey="origin"
        heading="Origination"
        showNext={true}
        placeholder={
          platformView === "desktop"
            ? "City (or) Postal Code"
            : "Origination"
        }
        isInternational={props.isOriginInternational}  // Pass isInternational
        setIsInternational={props.setIsOriginInternational}
      />
      <PostalSearch
        isFilled={props.isDestination}
        setIsFilled={props.setIsDestination}
        configKey="destination"
        heading="Destination"
        showNext={false}
        placeholder={
          platformView === "desktop"
            ? "City (or) Postal Code"
            : "Destination"
        }
        isInternational={props.isDestinationInternational}  // Pass isInternational
        setIsInternational={props.setIsDestinationInternational}
      />
      {/* <div className="loading-information-origin">
        <span>Origination</span>
        <div className="input-container">
          <input
            className="li-i"
            type="text"
            placeholder="City (or) Postal Code"
            onChange={(e) => writeOrigin(e.target.value)}
          />
        </div>
        <span>Must be in the United States</span>
        <div className="floating-icon">
          <img alt="IC" src={RightArrowIcon} />
        </div>
      </div> */}
      {/* <div className="loading-information-destination">
        <span>destination</span>
        <div className="input-container">
          <input
            className="li-i"
            type="text"
            placeholder="City (or) Postal Code"
            onChange={(e) => writeDestination(e.target.value)}
          />
        </div>
        <span>Must be in the United States</span>
      </div> */}
    </div>
  );
};

export default LoadingInformation;
