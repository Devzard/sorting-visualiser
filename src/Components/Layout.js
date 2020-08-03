import React, { useState, useEffect } from "react";

import "./Layout.css";
import bubbleSort from "./Algorithms/bubbleSort";
import selectionSort from "./Algorithms/selectionSort";
import Visualiser from "./Visualiser/Visualiser";

function Layout() {
  const [arr, setArr] = useState([]);
  //let upto 25 in mobile and upto 100 in desktop
  const [arrLen, setArrLen] = useState(10);
  const [history, setHistory] = useState([]);
  const [sortingAlgo, setSortingAlgo] = useState();

  //from 1 to 1000 miliseconds
  const [animationSpeed, setAnimationSpeed] = useState(500);

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
    } else if (algo === "selectionSort") {
      let newHistory = selectionSort(arr);
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
          <Visualiser
            arr={arr}
            history={history}
            sortingAlgo={sortingAlgo}
            animationSpeed={animationSpeed}
          />
        ) : (
          <></>
        )}
      </div>
      <div className={`options-panel`}>
        <button
          onClick={() => {
            sort("bubbleSort");
            setSortingAlgo("bubbleSort");
          }}
        >
          Bubble Sort
        </button>
        <button
          onClick={() => {
            sort("selectionSort");
            setSortingAlgo("selectionSort");
          }}
        >
          Selection Sort
        </button>
      </div>
    </div>
  );
}

export default Layout;
