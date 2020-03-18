function areNumbersEqual(a: number, b: number): boolean {
  const epsilon = 0.0000001;
  return Math.abs(a - b) < epsilon;
}

export {
  areNumbersEqual,
};
