import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { quoteActions } from "../../store/quote";
import RightArrowIcon from "../../assets/icons/right-arrow.svg";
import { getAutoCompleteSuggestionGAPI, getPostalCodeAPI, internationalCityAPI } from "../../adapters/restClient";
import { useSelector } from "react-redux";
import "./postalSearch.css";

const PostalSearch = (props) => {
  const quoteConfig = {...window.quoteConfig};
  const postalCountries = ["Austria", "Belgium", "Bulgaria", "Canada", "Switzerland", "Czech Republic", "Germany", "Denmark", "Estonia", "Spain", "Finland", "France", "United Kingdom", "Greece", "Croatia", "Hungary", "Ireland", "Israel", "Italy", "Liechtenstein", "Lithuania", "Luxembourg", "Latvia", "Netherlands", "Norway", "Poland", "Portugal", "Puerto Rico", "Romania", "Sweden", "Slovenia", "Slovakia", "Türkiye"];

  const platformView = useSelector(
    (state) => state.platformView.renderViewType
  );

  const { configKey, heading, showNext } = props;
  const dispatcher = useDispatch();
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const [valid, setValid] = useState(true);
  const [showPincodeDropdown, setShowPincodeDropdown] = useState(false);
  const [postalCodeDetails, setPostalCodeDetails] = useState([]);
  const [msg, setMsg] = useState("");

  const options = {
    types: ["(regions)"],
    componentRestrictions: {},
  };

  const blurHandler = (e) => {
    if (e.target.value) {
      setValid(true);
      props.setIsFilled(true);
    } else setValid(false);
  };

  useEffect(() => {
    if (!props.isFilled) {
      setEmptyDispatch("Please fill City (or) Postal Code");
    }
  }, [props.isFilled]);

  useEffect(() => {
    if (quoteConfig && quoteConfig[configKey]) {
      const country = quoteConfig[configKey].country;
      if (country) {
        props.setIsInternational(!(country === "US" || country === "CA"));
      }
    }


    if (!window.google) {
      window.location.reload(true);
    }
    window.pinValidation = window.pinValidation || {};
    if (quoteConfig && quoteConfig[configKey] && quoteConfig[configKey].ui) inputRef.current.value = quoteConfig[configKey].ui;
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      let postal = null, country = null, state = null, city = null, fCity = null, fState = null, fCountry = null;
      const { address_components } = place;

      address_components.forEach((address_component) => {
        address_component.types.forEach((type) => {
          if (type === "postal_code") {
            postal = address_component.short_name;
          } else if (type === "locality" || type === "sublocality") {
            city = address_component.short_name;
            fCity = address_component.long_name;
          } else if (type === "administrative_area_level_1") {
            state = address_component.short_name;
            fState = address_component.short_name;
          } else if (type === "country") {
            country = address_component.short_name;
            fCountry = address_component.long_name;
            props.setIsInternational(!(country === "US" || country === "CA"));
          }
        });
      });

      if (address_components.length < 3 && !exceptionCase(state)) {
        setEmptyDispatch("Please search by City or Postal.");
      } else if (postal && (postalCountries.includes(fCountry) || (country === "US"))) {
        dispatcher(
          quoteActions.writeKey({
            key: configKey,
            value: { country, postal, city, ui: `${fCity}, ${postal}, ${fCountry}` },
          })
        );
        setValueDispatch();
      } else if (country === "US") {
        const payload = {
          "country": country,
          "city": city,
          "state": state
        }
        const postalCodeData = await getPostalCodeAPI(payload);
        const { success, postals, message } = postalCodeData;
        if (success && postals.length) {
          setPostalCodeDetails(postals);
          setShowPincodeDropdown(true);
          setValueDispatch();
        } else {
          setEmptyDispatch(message);
        }
      } else if (postalCountries.includes(fCountry)) {
        setEmptyDispatch("This location requires a Postal search.");
      } else {
        if (!city && state) {
          city = state;
          fCity = fState;
        }
        const payload = {
          "country": country,
          "city": city,
        }
        const internationalCityData = await internationalCityAPI(payload);
        const { success, cityCode, message } = internationalCityData;
        if (success && cityCode) {
          dispatcher(
            quoteActions.writeKey({
              key: configKey,
              value: { country, city: cityCode, ui: `${fCity}, ${fCountry}` },
            })
          );
          setValueDispatch();
        } else {
          setEmptyDispatch(message);
        }
      }
      
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      //validation for valid postal code
      if (!postal || !city) {
        console.error("Failed to retreive postal code/city, try again");
      }
      dispatcher(
        quoteActions.writeKey({
          key: `${configKey}Geometry`,
          value: { lat, lng },
        })
      );
    });
  }, []);

  const handlePostal = e => {
    const { postal, city, country } = JSON.parse(e.target.dataset.postal);
    inputRef.current.value = e.target.innerText;
    setShowPincodeDropdown(false);
    dispatcher(
      quoteActions.writeKey({
        key: configKey,
        value: { country, postal, city, ui: e.target.innerText },
      })
    );
    setValueDispatch();
  }

  const exceptionCase = city => {
    if (!city) return false;
    const exceptionCities = ["tokyo"];
    return exceptionCities.includes(city.toLowerCase());
  }

  const setEmptyDispatch = (message, validation = false) => {
    dispatcher(
      quoteActions.writeKey({
        key: configKey,
        value: null,
      })
    );
    window.pinValidation[configKey] = false;
    setValid(validation);
    setMsg(message);
  }

  const setValueDispatch = () => {
    setValid(true);
    setMsg("");
    window.pinValidation[configKey] = true;
  }

  const changeHandler = () => {
    setEmptyDispatch("", true);
    if (showPincodeDropdown) setShowPincodeDropdown(false);
  }

  return (
    <div className="loading-information-origin">
      {platformView === "desktop" && <span>{heading}</span>}
      <div className="input-container">
        <input
          ref={inputRef}
          onBlur={blurHandler}
          className={`li-i ${valid && props.isFilled ? "" : "field--invalid"}`}
          type="text"
          onChange={() => changeHandler()}
          placeholder={
            platformView === "desktop"
              ? "City (or) Postal Code"
              : `${props.placeholder}`
          }
        />
        <div className="error_msg">{msg}</div>
        <div className={`dropdown_wrapper ${showPincodeDropdown ? '' : 'hide_dropdown'}`} onClick={e => handlePostal(e)}>
          {postalCodeDetails.map(postal => (
            <div key={postal.postal} data-postal={JSON.stringify(postal)} className="dropdown_item" value={postal.ui}>{postal.ui}</div>
          ))}
        </div>
      </div>
      {showNext && (
        <div className="floating-icon">
          <img alt="IC" src={RightArrowIcon} />
        </div>
      )}
    </div>
  );
};

export default PostalSearch;
