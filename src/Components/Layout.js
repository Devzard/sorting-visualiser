import React, { useState, useEffect } from "react";

import "./Layout.css";
import Visualiser from "./Visualiser/Visualiser";

function Layout() {
  const [arr, setArr] = useState([]);
  const [arrLen, setArrLen] = useState([20]);
  const [isSorted, setIsSorted] = useState(false);
  const [timeDelay, setTimeDelay] = useState(50);

  const init = () => {
    let newArr = [];
    for (let i = 0; i < arrLen; i++) {
      let randomNum = Math.floor(Math.random() * (arrLen * 100));
      newArr.push(randomNum);
    }
    setArr(newArr);
  };

  const rep = () => {
    let timer = setInterval(() => {
      init();
    }, [1000]);
  };

  useEffect(() => {
    //rep();
  }, []);

  return (
    <div>
      <Visualiser arr={arr} />
      <div className={`sort-containers`}>
        <button
          className={`refresh-btn`}
          onClick={() => {
            init();
            setIsSorted(false);
          }}
        >
          Refresh
        </button>
      </div>
    </div>
  );
}

export default Layout;
