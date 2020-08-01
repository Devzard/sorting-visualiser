import React, { useState, useMemo, createRef, useEffect } from "react";

import "./visualiser.css";

function Visualiser({ arr, history, sortingAlgo, animationSpeed }) {
  const [highestValue, setHighestValue] = useState(0);
  const [totalBars, setTotalBars] = useState(0);

  // reference to divs to change their style
  const refs = useMemo(
    () => Array.from({ length: arr.length }).map(() => createRef()),
    []
  );

  const textRefs = useMemo(
    () => Array.from({ length: arr.length }).map(() => createRef()),
    []
  );

  //animate function
  const animate = () => {
    if (sortingAlgo == "bubbleSort") {
      let i = 0;
      let j = 0;
      //to conditionally animate bars
      let openValve = false;
      let timer = setInterval(() => {
        console.log("bubble sort animation runnig !");
        if (openValve) {
          //changing the active bars back to original color
          refs[history.activeBars[j]].current.style.backgroundColor = "salmon";
          if (history.activeBars[j + 1] < 20)
            refs[history.activeBars[j + 1]].current.style.backgroundColor =
              "salmon";
          j += 2;

          history.array[i].map((item, index) => {
            let height = `${(item / highestValue) * 100}%`;
            if (refs[index].current.style.height != height) {
              refs[index].current.style.height = height;
              textRefs[index].current.innerHTML = `${item}`;
            }
          });
          i++;

          openValve = !openValve;
        } else {
          //display active bars that are being compared
          refs[history.activeBars[j]].current.style.backgroundColor = "cyan";
          if (history.activeBars[j + 1] < 20)
            refs[history.activeBars[j + 1]].current.style.backgroundColor =
              "cyan";

          openValve = !openValve;
        }

        if (i >= history.array.length - 1) clearInterval(timer);
      }, animationSpeed);
    }
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
    if (history.array != null && history.array.length > 0) animate();
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
                <span ref={textRefs[index]} className={`rotate-90`}>
                  {item}
                </span>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default React.memo(Visualiser);
