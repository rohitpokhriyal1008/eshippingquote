import React, { useState } from "react";
import BinIcon from "../../assets/icons/bin.svg";
import ToggleSelector from "./ToggleSelector";
import "./getQuote.css";
import { useSelector } from "react-redux";

const ShippingItemFCL = (props) => {
  const platformView = useSelector(
    (state) => state.platformView.renderViewType
  );

  const { newItem, updateShippingItems, deleteShippingItem } = props;
  let item = { ...newItem };
  const itemKey = item.containerNumber;

  // const [validQuantityCONT, setValidQuantityCONT] = useState(true);
  // const [validDescriptionCONT, setValidDescriptionCONT] = useState(true);
  // const [validWeightCONT, setValidWeightCONT] = useState(true);

  if (props.onClickCONT) {
    if (!item["containerQuantity"]) props.setValidQuantityCONT(false);
    if (!item["containerDescription"]) props.setValidDescriptionCONT(false);
    if (!item["containerWeight"]) props.setValidWeightCONT(false);
  }

  const onItemInputValueChange = (itemTypeKey, value) => {
    item[itemTypeKey] = value;
    updateShippingItems(itemKey, item);
  };

  const blurHandler = (e, cb) => {
    if (e.target.value) cb(true);
    else cb(false);
  };

  return (
    <div className="shipping-item">
      <div className="item-type-no">
        {platformView === "desktop" && <span>Container No.</span>}
        <input disabled value={item["containerNumber"]} type="text" />
      </div>
      <div className="item-type-text ">
        {platformView === "desktop" && <span>Container description</span>}
        <input
          onChange={(e) =>
            onItemInputValueChange("containerDescription", e.target.value)
          }
          type="text"
          value={item["containerDescription"]}
          className={`${props.validDescriptionCONT ? "" : "field--invalid"}`}
          onBlur={(e) => blurHandler(e, props.setValidDescriptionCONT)}
          placeholder={"Commodity description"}
        />
      </div>

        <div
            className="item-type-text item-type-text--cont-qty"
        >
            {platformView === "desktop" && <span>Quantity</span>}
            <input
                className={`${props.validQuantityCONT ? "" : "field--invalid"}`}
                onChange={(e) =>
                    onItemInputValueChange("containerQuantity", e.target.value)
                }
                type="number"
                value={item["containerQuantity"]}
                onBlur={(e) => blurHandler(e, props.setValidQuantityCONT)}
                placeholder={"Qty."}
            />
        </div>

      <div className="item-type-number"

      >
        {platformView === "desktop" && <span>Container weight</span>}
        <div>
          <input
            onChange={(e) =>
              onItemInputValueChange("containerWeight", e.target.value)
            }
            type="number"
            value={item["containerWeight"]}
            className={`${props.validWeightCONT ? "" : "field--invalid"}`}
            style={{ maxWidth: "80%" }}
            onBlur={(e) => blurHandler(e, props.setValidWeightCONT)}
            placeholder={"Weight"}
          />
          <span className="item-weight-unit" style={{ background: "#555F6A" }}>lbs</span>
        </div>
      </div>
      <ToggleSelector
        onItemInputValueChange={onItemInputValueChange}
        selected={item["containerSize"]}
        options={["20'DV", "40'DV", "40'HC"]}
        itemKey="containerSize"
        heading={platformView === "desktop" && "Choose Container Size"}
        selectedClass="selected-black"
        btnClass="btn-xl"
      />

      <div className="item-type-del-btn">
        {platformView === "desktop" && <span>Delete Item</span>}
        <button onClick={() => deleteShippingItem(itemKey)}>
          <img src={BinIcon} alt="bi" style={{ height: "21px" }} />
        </button>
      </div>
    </div>
  );
};

export default ShippingItemFCL;
