function sum() {
  const arr = [...arguments];
  console.log(arr.reduce((acc, curr) => acc + curr));
}
sum(1, 2, 7); // Expected Output => 10
sum(1, 4); // Expected Output => 5
sum(11); // Expected Output => 11
sum(10, 3, 6, 7, 9); // Expected Output => 35