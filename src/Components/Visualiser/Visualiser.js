import React, { useState, useMemo, createRef, useEffect } from "react";

import "./visualiser.css";

function Visualiser({ arr, history }) {
  const [highestValue, setHighestValue] = useState(0);
  const [totalBars, setTotalBars] = useState(0);

  // reference to divs to change their style
  const refs = useMemo(
    () => Array.from({ length: arr.length }).map(() => createRef()),
    []
  );

  //animate function
  const animate = () => {
    let i = 0;
    let timer = setInterval(() => {
      history[i].map((item, index) => {
        let height = `${(item / highestValue) * 100}%`;
        if (refs[index].current.style.height != height)
          refs[index].current.style.height = height;
      });
      i++;

      if (i >= history.length - 1) clearInterval(timer);
    }, 300);
  };

  useEffect(() => {
    let highest = arr[0];
    arr.map((item) => {
      if (item > highest) highest = item;
    });
    setHighestValue(highest);
    setTotalBars(arr.length);
  }, []);

  useEffect(() => {
    if (history.length != null && history.length > 0) animate();
  }, [history]);

  return (
    <div className={`visualiser-container`}>
      {/* {his.map((item, index) => {
        return (
          <div
            onClick={() => addHeight(index)}
            ref={refs[index]}
            style={{ height: `${item}%`, width: `5%` }}
          >
            {item}
          </div>
        );
      })} */}
      {highestValue <= 0 ? (
        <></>
      ) : (
        <>
          {arr.map((item, index) => {
            let height = `${(item / highestValue) * 100}%`;
            let width = `${(1 / totalBars) * 100}%`;
            let styleDiv = {
              height: height,
              width: width,
              backgroundColor: "salmon",
            };
            return (
              <div
                ref={refs[index]}
                onClick={() => animate(index)}
                style={styleDiv}
                className={`each-bar`}
                key={index}
              >
                <span className={`rotate-90`}>{item}</span>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default React.memo(Visualiser);
