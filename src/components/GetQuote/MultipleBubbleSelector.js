import React, { useEffect, useState } from "react";
import "./getQuote.css";
import CheckIcon from "../../assets/icons/check.svg";
import PlusIcon from "../../assets/icons/plus-grey.svg";

const MultipleBubbleSelector = (props) => {
  const quoteConfig = {...window.quoteConfig};
  const [options, setOptions] = useState(
    props.options.map((option) => ({ name: option, selected: (quoteConfig && quoteConfig[props.serviceKey] && quoteConfig[props.serviceKey].includes(option)) || false }))
  );
  const toogleBubble = (bubbleName) => {
    setOptions((prev) => {
      const bubbleIndex = prev.findIndex(({ name }) => name === bubbleName);
      prev[bubbleIndex].selected = !prev[bubbleIndex].selected;
      return [...prev];
    });
  };
  useEffect(() => {
    props.cb(
      props.serviceKey,
      options.filter(({ selected }) => selected == true).map(({ name }) => name)
    );
  }, [options]);
  return (
    <div className="multiple-bubble-select">
      <h2>{props.serviceName}</h2>
      <div className="bubble-box">
        {options.map(({ name, selected }) => (
          <button
            key={name}
            onClick={() => toogleBubble(name)}
            className={"bubble " + (selected ? "active" : "")}
          >
            <img src={CheckIcon} alt="ci" />
            <img src={PlusIcon} alt="pi" />
            <span>{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultipleBubbleSelector;
