import React, {useEffect, useRef, useState} from "react";
import "./getQuote.css";
import PlusIcon from "../../assets/icons/plus.svg";
import ShippingItemLTL from "./ShippingItemLTL";
import { useDispatch } from "react-redux";
import { quoteActions } from "../../store/quote";

const ShippingItems = (props) => {
  const quoteConfig = {...window.quoteConfig};
  const freightClassRef = useRef(null);
  const [freightClass, setFreightClass] = useState("");
  const [shippingItems, setShippingItems] = useState(quoteConfig?.items || [
    {
      itemNumber: 1,
      itemDescription: "",
      itemCondition: "NEW",
      itemWeight: "",
      itemLength: "",
      itemHeight: "",
      itemWidth: "",
      itemQuantity: "",
    }
  ]);
  const dispatcher = useDispatch();
  useEffect(() => {
    // whenever there is a change in shipping items state, we will update the central state of quote config
    dispatcher(
      quoteActions.writeKey({
        key: "items",
        value: JSON.parse(JSON.stringify(shippingItems)),
      })
    );
  }, [shippingItems]);


  useEffect(() => {
    if (quoteConfig?.freightClass) freightClassRef.current.value = quoteConfig.freightClass;
  }, []);

  const writeFreightClass = (e) => {
    setFreightClass(e.target.value);
    dispatcher(
        quoteActions.writeKey({
          key: "freightClass",
          value: e.target.value,
        })
    );
  };

  const addShipppingItem = () => {
    setShippingItems((prev) => {
      const prevCopy = JSON.parse(JSON.stringify(prev));
      const itemCount = prevCopy.length;
      // added item will duplicate the contents of last item
      // const duplicateItem = { ...prev[itemCount - 1] };
      // duplicateItem.itemNumber = itemCount + 1;
      const newItem = {
        itemNumber: itemCount + 1,
        itemDescription: "",
        itemCondition: "NEW",
        itemWeight: "",
        itemLength: "",
        itemHeight: "",
        itemWidth: "",
        itemQuantity: "",
      };
      // prev.push(duplicateItem);
      prevCopy.push(newItem);
      return [...prevCopy];
    });
  };

  const deleteShippingItem = (targetKey) => {
    if (shippingItems.length === 1) {
      return;
    }
    setShippingItems((prev) => {
      return prev
        .filter((item) => item.itemNumber !== targetKey)
        .map((item, i) => {
          item.itemNumber = i + 1;
          return item;
        });
    });
  };

  const updateShippingItems = (targetKey, newValue) => {
    setShippingItems((prev) => {
      let copyPrev = JSON.parse(JSON.stringify(prev));
      const itemIndex = copyPrev.findIndex((item) => item.itemNumber === targetKey);
      copyPrev[itemIndex] = newValue;
      return [...copyPrev];
    });
  };

  return (
    <div className="shipping-items-container">
      <p>Describe shipping items</p>
      <div className="freight-class">
        <span>Freight Class
          {(props.isOriginInternational || props.isDestinationInternational) &&
          <small>(Auto-assigned for international shipments)</small>
          }
        </span>

        <select
            /*className={`${props.validCommodity ? "" : "field--invalid"}`}*/
            placeholder="Freight Class"
            /*onChange={writeCommodityName}
            ref={containerRef}
            onBlur={(e) => {
                blurHandler(e, props.setValidCommodity);
            }}*/
            defaultValue="Auto"
            value={props.isOriginInternational || props.isDestinationInternational ? "Auto" : undefined}  // set value to Auto if isInternational is true
            disabled={props.isOriginInternational || props.isDestinationInternational}
            className={`${props.isOriginInternational || props.isDestinationInternational ? "disable-freight-class" : ""}`}
            onChange={writeFreightClass}
            ref={freightClassRef}
        >
          <option value="Auto">Auto-Assigned</option>
          <option value="50">50</option>
          <option value="55">55</option>
          <option value="60">60</option>
          <option value="65">65</option>
          <option value="70">70</option>
          <option value="77.5">77.5</option>
          <option value="85">85</option>
          <option value="92.5">92.5</option>
          <option value="100">100</option>
          <option value="110">110</option>
          <option value="125">125</option>
          <option value="150">150</option>
          <option value="175">175</option>
          <option value="200">200</option>
          <option value="250">250</option>
          <option value="300">300</option>
          <option value="400">400</option>
          <option value="500">500</option>
        </select>
      </div>

      <div className="shipping-items">
        {shippingItems.map((item, index) => (
          <ShippingItemLTL
            onClickLTL={props.onClickLTL}
            setOnClickLTL={props.setOnClickLTL}
            validDescription={props.validDescription}
            setValidDescription={props.setValidDescription}
            validWeight={props.validWeight}
            setValidWeight={props.setValidWeight}
            validHeight={props.validHeight}
            setValidHeight={props.setValidHeight}
            validWidth={props.validWidth}
            setValidWidth={props.setValidWidth}
            validLength={props.validLength}
            setValidLength={props.setValidLength}
            validQuantity={props.validQuantity}
            setValidQuantity={props.setValidQuantity}
            key={item.itemNumber}
            newItem={item}
            index={index}
            deleteShippingItem={deleteShippingItem}
            updateShippingItems={updateShippingItems}
            setShippingItems={setShippingItems}
          />
        ))}
      </div>
      <button className="primary-theme-btn" onClick={addShipppingItem}>
        <img src={PlusIcon} alt="pi" />
        Add item
      </button>
    </div>
  );
};

export default ShippingItems;
