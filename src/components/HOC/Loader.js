import React, { useEffect, useState } from "react";
import LoadingImage from "../../assets/images/loading.svg";
import LoadingBoxesImage from "../../assets/images/loadingBoxes.svg";
import "./hoc.css";
const Loader = (props) => {
  // writing some pseudo logic for loading percent as its not coupled with backend
  const [loading, setLoading] = useState(1);
  useEffect(() => {
    for (let i = 1; i <= 100; i++) {
      setTimeout(() => {
        setLoading((prev) => i);
      }, i * 90 + 1000);
    }
  }, []);

  return (
    <div className="loader">
      <img src={LoadingImage} alt={"loadingImage"} />
      <div className="loading-percent">
        <span>{loading}%</span>
        <p>Loading</p>
      </div>
      <img src={LoadingBoxesImage} alt={"loadingImage"} />
    </div>
  );
};

export default Loader;
