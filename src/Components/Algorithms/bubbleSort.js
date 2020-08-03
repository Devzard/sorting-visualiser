const bubbleSort = (arr) => {
  let tempArray = [...arr];
  let arrLen = arr.length;
  let historyArr = [];
  let activeBars = [];
  let history = {};

  for (let i = 0; i < arrLen; i++) {
    for (let j = 0; j < arrLen - 1 - i; j++) {
      if (tempArray[j] > tempArray[j + 1]) {
        tempArray[j] = tempArray[j] + tempArray[j + 1];
        tempArray[j + 1] = tempArray[j] - tempArray[j + 1];
        tempArray[j] = tempArray[j] - tempArray[j + 1];
      }
      activeBars.push(j);
      activeBars.push(j + 1);
      historyArr.push([...tempArray]);
    }
  }

  history.array = historyArr;
  history.activeBars = activeBars;
  return history;
};

export default bubbleSort;
