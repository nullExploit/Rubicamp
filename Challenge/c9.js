function spiral(param1) {
  let count = 0;
  const arr = [],
  spiralMatrix = (matrix) => {
    const arr = [];
    while (matrix.length) {
      arr.push(
        ...matrix.shift(),
        ...matrix.map((a) => a.pop()),
        ...(matrix.pop() || []).reverse(),
        ...matrix.map((a) => a.shift()).reverse()
      );
    }
    return arr;
  }

  for (let i = 0; i < param1; i++) {
    arr[i] = [];
    for (let j = 0; j < param1; j++) {
      arr[i][j] = count;
      count++;
    }
  }

  console.log(spiralMatrix(arr))
}

spiral(5);
spiral(6);
spiral(7);