function fibs(n) {
  const arr = [0, 1];

  if (n === 1 || n === 2) {
    return arr.slice(0, n);
  }

  for (let i = 2; i < 8; i += 1) {
    fibNum = arr[i - 2] + arr[i - 1];
    arr.push(fibNum);
  }

  return arr;
}

function fibsRec(n) {
  if (n === 1) {
    return [0];
  } else if (n === 2) {
    return [0, 1];
  } else {
    const arr = fibsRec(n - 1);
    arr.push(arr[arr.length - 2] + arr[arr.length - 1]);
    return arr;
  }
}

console.log(`Iterative version: ${fibs(8)}`);
console.log(`Recursive version: ${fibsRec(8)}`);
