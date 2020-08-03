import React, { useState, useMemo, createRef, useEffect } from "react";

import "./visualiser.css";
import selectionSort from "../Algorithms/selectionSort";

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
    ////////// BUBBLE SORT //////////////
    if (
      sortingAlgo == "bubbleSort" &&
      history.array != null &&
      history.array.length > 0
    ) {
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

      //////// SELECTION SORT //////////
    } else if (
      sortingAlgo == "selectionSort" &&
      history.length != null &&
      history.length > 0
    ) {
      console.log(history);
      let i = 0,
        height;
      let timer = setInterval(() => {
        if (i > 0) {
          if (history[i - 1].i >= 0)
            refs[history[i - 1].i].current.style.backgroundColor = "salmon";
          if (history[i - 1].j >= 0)
            refs[history[i - 1].j].current.style.backgroundColor = "salmon";
        }

        if (history[i].i >= 0)
          refs[history[i].i].current.style.backgroundColor = "cyan";
        if (history[i].j >= 0)
          refs[history[i].j].current.style.backgroundColor = "cyan";

        if (history[i].iValue >= 0) {
          refs[history[i].i].current.style.height = `${
            (history[i].iValue / highestValue) * 100
          }%`;
          textRefs[history[i].i].current.innerHTML = `${history[i].iValue}`;
        }
        if (history[i].jValue >= 0) {
          refs[history[i].j].current.style.height = `${
            (history[i].jValue / highestValue) * 100
          }%`;
          textRefs[history[i].j].current.innerHTML = `${history[i].jValue}`;
        }

        i++;
        if (i >= history.length) {
          arr.map((item, index) => {
            refs[index].current.style.backgroundColor = "salmon";
          });
          clearInterval(timer);
        }
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
    animate();
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
