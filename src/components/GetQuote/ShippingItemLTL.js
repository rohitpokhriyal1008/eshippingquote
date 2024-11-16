// we could have used ref for the inputs but because of dynamic saving state needs to be updated after on change, will add debouncing though.
import React, { useState } from "react";
import "./getQuote.css";
import BinIcon from "../../assets/icons/bin.svg";
import ToggleSelector from "./ToggleSelector";
import { useSelector } from "react-redux";

const ShippingItemLTL = (props) => {
  const platformView = useSelector(
    (state) => state.platformView.renderViewType
  );

  const { newItem, updateShippingItems, deleteShippingItem } = props;
  let item = {...newItem};
  const itemKey = item.itemNumber;

  // const [validDescription, setValidDescription] = useState(true);
  // const [validWeight, setValidWeight] = useState(true);
  // const [validLength, setValidLength] = useState(true);
  // const [validWidth, setValidWidth] = useState(true);
  // const [validHeight, setValidHeight] = useState(true);
  // const [validQuantity, setValidQuantity] = useState(true);

  if (props.onClickLTL) {
    if (!item["itemDescription"]) props.setValidDescription(false);
    if (!item["itemWeight"]) props.setValidWeight(false);
    if (!item["itemLength"]) props.setValidLength(false);
    if (!item["itemWidth"]) props.setValidWidth(false);
    if (!item["itemHeight"]) props.setValidHeight(false);
    if (!item["itemQuantity"]) props.setValidQuantity(false);
  }

  const blurHandler = (e, cb) => {
    if (e.target.value) cb(true);
    else cb(false);
  };

  const onItemInputValueChange = (itemTypeKey, value) => {
    item[itemTypeKey] = value;
    updateShippingItems(itemKey, item);
  };
  return (
    <div className="shipping-item">
      <div className="item-type-no">
        {platformView === "desktop" && <span>Item No.</span>}
        <input disabled value={item["itemNumber"]} type="text" />
      </div>
      <div className="item-type-text">
        {platformView === "desktop" && <span>Item description</span>}
        <input
          onChange={(e) =>
            onItemInputValueChange("itemDescription", e.target.value)
          }
          className={`${props.validDescription ? "" : "field--invalid"}`}
          onBlur={(e) => blurHandler(e, props.setValidDescription)}
          type="text"
          value={item["itemDescription"]}
          placeholder={"Commodity description"}
        />
      </div>
      {/*<ToggleSelector
        onItemInputValueChange={onItemInputValueChange}
        selected={item["itemCondition"]}
        options={["NEW", "USED"]}
        heading={platformView === "desktop" && "Item Condition"}
        itemKey="itemCondition"
        selectedClass="selected-blue"
      />*/}
      <div className="item-type-number item-weight">
        {platformView === "desktop" && <span>Item weight</span>}{" "}
        <div>
          <input
            className={`${props.validWeight ? "" : "field--invalid"}`}
            onBlur={(e) => blurHandler(e, props.setValidWeight)}
            onChange={(e) =>
              onItemInputValueChange("itemWeight", e.target.value)
            }
            type="number"
            value={item["itemWeight"]}
            placeholder={"Weight"}
            min="1"
          />
          <span className="item-weight-unit">lbs</span>
        </div>
      </div>
      <div className="item-type-number">
        {platformView === "desktop" && <span>Item length</span>}
        <div>
          <input
            className={`${props.validLength ? "" : "field--invalid"}`}
            onBlur={(e) => blurHandler(e, props.setValidLength)}
            onChange={(e) =>
              onItemInputValueChange("itemLength", e.target.value)
            }
            type="number"
            value={item["itemLength"]}
            placeholder={"L"}
          />
          <span>Inches</span>
        </div>
      </div>
      <div className="item-type-number">
        {platformView === "desktop" && <span>Item width</span>}
        <div>
          <input
            className={`${props.validWidth ? "" : "field--invalid"}`}
            onBlur={(e) => blurHandler(e, props.setValidWidth)}
            onChange={(e) =>
              onItemInputValueChange("itemWidth", e.target.value)
            }
            type="number"
            value={item["itemWidth"]}
            placeholder={"W"}
          />
          <span>Inches</span>
        </div>
      </div>
      <div className="item-type-number">
        {platformView === "desktop" && <span>Item height</span>}
        <div>
          <input
            className={`${props.validHeight ? "" : "field--invalid"}`}
            onBlur={(e) => blurHandler(e, props.setValidHeight)}
            onChange={(e) =>
              onItemInputValueChange("itemHeight", e.target.value)
            }
            type="number"
            value={item["itemHeight"]}
            placeholder={"H"}
          />
          <span>Inches</span>
        </div>
      </div>
      <div className="item-type-text-sm">
        {platformView === "desktop" && <span>Item Qty</span>}
        <input
          className={`${props.validQuantity ? "" : "field--invalid"}`}
          onBlur={(e) => blurHandler(e, props.setValidQuantity)}
          onChange={(e) =>
            onItemInputValueChange("itemQuantity", e.target.value)
          }
          type="number"
          value={item["itemQuantity"]}
          placeholder={"Qty"}
        />
      </div>
      <div className="item-type-del-btn">
        {platformView === "desktop" && <span>Delete Item</span>}
        <button onClick={() => deleteShippingItem(itemKey)}>
          <img src={BinIcon} alt="bi" style={{ height: "21px" }} />
        </button>
      </div>
    </div>
  );
};

export default ShippingItemLTL;
