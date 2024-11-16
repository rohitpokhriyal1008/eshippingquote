import React, { useState, useEffect } from "react";
import Loader from "./Loader";

const LoaderHOC = (InnerComponent, Adapter) => {
  function HOC(props) {
    const [hocState, setHocState] = useState({
      isLoaded: false,
      data: null,
    });
    useEffect(() => {
      const fetchData = async () => {
        const data = await Adapter();
        setHocState({ isLoaded: true, data });
      };
      fetchData();
    }, []);

    if (!hocState.isLoaded) {
      return <Loader />;
    } else {
      return <InnerComponent {...props} {...hocState.data} />;
    }
  }
  return HOC;
};

export default LoaderHOC;
