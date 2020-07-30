import React, { useState, useEffect } from "react";

import "./Layout.css";
import bubbleSort from "./Algorithms/bubbleSort";
import Visualiser from "./Visualiser/Visualiser";

function Layout() {
  const [arr, setArr] = useState([]);
  const [arrLen, setArrLen] = useState(20);
  const [history, setHistory] = useState([]);

  //initialise an array with random values , length is determined by state of arrLen
  const init = () => {
    let tempArray = [],
      randomVal = 0;
    for (let i = 0; i < arrLen; i++) {
      randomVal = Math.floor(Math.random() * (arrLen * 10));
      tempArray.push(randomVal);
    }
    setArr(tempArray);
  };

  //calls sorting algorithm according to the parameter passed
  const sort = (algo) => {
    if (algo === "bubbleSort") {
      let newHistory = bubbleSort(arr);
      setHistory(newHistory);
    }
  };

  useEffect(() => {
    init();
  }, []);

  // useEffect(() => {
  //   console.log(history);
  // }, [history]);

  return (
    <div className={`container`}>
      <div className={`visualiser`}>
        {arr.length != null && arr.length > 0 ? (
          <Visualiser arr={arr} history={history} />
        ) : (
          <></>
        )}
      </div>
      <div className={`options-panel`}>
        <button onClick={() => sort("bubbleSort")}>Bubble Sort</button>
      </div>
    </div>
  );
}

export default Layout;
