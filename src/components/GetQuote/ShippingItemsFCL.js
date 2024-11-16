import React, { useEffect, useState, useRef } from "react";
import "./getQuote.css";
import PlusIcon from "../../assets/icons/plus.svg";
import ShippingItemFCL from "./ShippingItemFCL";
import { useDispatch } from "react-redux";
import { quoteActions } from "../../store/quote";

const ShippingItemsFCL = (props) => {
  const quoteConfig = {...window.quoteConfig};
  const containerRef = useRef(null);
  const [commodityName, setCommodityName] = useState("");

  if (props.onClickCONT) {
    if (!commodityName) props.setValidCommodity(false);
  }

  const [shippingItems, setShippingItems] = useState(quoteConfig?.containers || [
    {
      containerNumber: 1,
      containerQuantity: "",
      containerDescription: "",
      containerWeight: "",
      containerSize: "40'DV",
    },
  ]);
  const dispatcher = useDispatch();
  useEffect(() => {
    // whenever there is a change in shipping items state, we will update the central state of quote config
    dispatcher(
      quoteActions.writeKey({
        key: "containers",
        value: JSON.parse(JSON.stringify(shippingItems)),
      })
    );
  }, [shippingItems]);

  useEffect(() => {
    if (quoteConfig?.containerCommodityName) containerRef.current.value = quoteConfig.containerCommodityName;
  }, []);

  const writeCommodityName = (e) => {
    setCommodityName(e.target.value);
    dispatcher(
      quoteActions.writeKey({
        key: "containerCommodityName",
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
      // duplicateItem.containerNumber = itemCount + 1;

      const newItem = {
        containerNumber: itemCount + 1,
        containerQuantity: "",
        containerDescription: "",
        containerWeight: "",
        containerSize: "40'DV",
      };

      prevCopy.push(newItem);
      // prev.push(duplicateItem);
      return [...prevCopy];
    });
  };

  const blurHandler = (e, cb) => {
    if (e.target.value) cb(true);
    else cb(false);
  };

  const deleteShippingItem = (targetKey) => {
    if (shippingItems.length === 1) {
      console.error("Minimum 1 item Required");
      return;
    }
    setShippingItems((prev) => {
      return prev
        .filter((item) => item.containerNumber !== targetKey)
        .map((item, i) => {
          item.containerNumber = i + 1;
          return item;
        });
    });
  };

  const updateShippingItems = (targetKey, newValue) => {
    setShippingItems((prev) => {
      let copyPrev = JSON.parse(JSON.stringify(prev));
      const itemIndex = copyPrev.findIndex(
        (item) => item.containerNumber === targetKey
      );
      copyPrev[itemIndex] = newValue;
      return [...copyPrev];
    });
  };
  return (
    <div className="shipping-items-container shipping-items-container--fcl">
      <p>Describe shipping items</p>
      {/*<div className="shipping-items-description">
        <span>Commodity Name</span>
        <input
          className={`${props.validCommodity ? "" : "field--invalid"}`}
          type="text"
          placeholder="Commodity Name"
          onChange={writeCommodityName}
          ref={containerRef}
          onBlur={(e) => {
            blurHandler(e, props.setValidCommodity);
          }}
        />
      </div>*/}
      <div className="shipping-items">
        {shippingItems.map((item) => (
          <ShippingItemFCL
            key={item.containerNumber}
            newItem={item}
            deleteShippingItem={deleteShippingItem}
            updateShippingItems={updateShippingItems}
            onClickCONT={props.onClickCONT}
            setOnClickCONT={props.setOnClickCONT}
            validDescriptionCONT={props.validDescriptionCONT}
            setValidDescriptionCONT={props.setValidDescriptionCONT}
            validWeightCONT={props.validWeightCONT}
            setValidWeightCONT={props.setValidWeightCONT}
            validQuantityCONT={props.validQuantityCONT}
            setValidQuantityCONT={props.setValidQuantityCONT}
            quoteConfig={quoteConfig}
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

export default ShippingItemsFCL;
