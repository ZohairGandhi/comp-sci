function mergeSort(arr) {
  if (arr.length === 1) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);
  const leftHalf = arr.slice(0, mid);
  const rightHalf = arr.slice(mid, arr.length);

  return merge(mergeSort(leftHalf), mergeSort(rightHalf));
}

function merge(left, right) {
  const mergedArr = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      mergedArr.push(left[i]);
      i += 1;
    } else {
      mergedArr.push(right[j]);
      j += 1;
    }
  }

  while (i < left.length) {
    mergedArr.push(left[i]);
    i += 1;
  }

  while (j < right.length) {
    mergedArr.push(right[j]);
    j += 1;
  }

  return mergedArr;
}

console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));
