export default function selectionSort(arr) {
  let tempArray = [...arr];
  let arrLen = arr.length;

  let history = [];

  const pushIntoHistory = (i, j, ivalue, jvalue) => {
    history.push({
      i: i,
      j: j,
      iValue: ivalue,
      jValue: jvalue,
    });
  };

  for (let i = 0; i < arrLen - 1; i++) {
    let minPos = i;
    pushIntoHistory(i, -1, tempArray[i], -1);

    for (let j = i + 1; j < arrLen; j++) {
      if (tempArray[minPos] > tempArray[j]) minPos = j;
      pushIntoHistory(i, j, tempArray[i], tempArray[j]);
    }

    if (minPos != i) {
      pushIntoHistory(i, minPos, tempArray[minPos], tempArray[i]);

      let temp;
      temp = tempArray[i];
      tempArray[i] = tempArray[minPos];
      tempArray[minPos] = temp;
    }
  }

  return history;
}
