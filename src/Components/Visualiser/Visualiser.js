import React, { useState, useEffect } from "react";

import "./visualiser.css";

export default function Visualiser({ arr }) {
  const [gridRowsLen, setGridRowsLen] = useState(0);
  const [gridColumnsLen, setGridColumnsLen] = useState(0);

  //initialises the parameters for the grid
  const init = () => {
    let highestVal = arr[0];
    arr.map((item) => {
      if (item > highestVal) highestVal = item;
    });
    setGridRowsLen(highestVal);
    setGridColumnsLen(arr.length);
  };

  //draws a cell
  const drawUnits = (index, value, color) => {
    let styleDiv = {
      width: 10,
      height: 10,
      background: color,
    };

    let width = (1 / gridColumnsLen) * 100;
    styleDiv.width = `${width}%`;

    let height = (value / gridRowsLen) * 100;
    styleDiv.height = `${height}%`;

    return (
      <div style={styleDiv} className={`each-row`} key={index}>
        <span className={`rotate-90`}>{value}</span>
      </div>
    );
  };

  // useEffect(() => {

  // }, [gridRowsLen, gridColumnsLen]);

  useEffect(() => {
    init();
  }, [arr]);

  return (
    <div className={`visualiser-container`}>
      {arr.map((item, index) => {
        return drawUnits(index, item, "salmon");
      })}
    </div>
  );
}
