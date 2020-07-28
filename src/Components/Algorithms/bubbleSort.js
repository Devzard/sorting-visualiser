const bubbleSort = (arr) => {
  let tempArray = [...arr];
  let arrLen = arr.length;
  let history = [];
  for (let i = 0; i < arrLen; i++) {
    for (let j = 0; j < arrLen; j++) {
      if (tempArray[j] > tempArray[j + 1]) {
        tempArray[j] = tempArray[j] + tempArray[j + 1];
        tempArray[j + 1] = tempArray[j] - tempArray[j + 1];
        tempArray[j] = tempArray[j] - tempArray[j + 1];
      }
      history.push([...tempArray]);
    }
  }
  return history;
};

export default bubbleSort;
