import { Point } from '../compiler/types';

const roundToNum = (num: number, roundTo: number): number => {
  return Math.floor((num + roundTo - 1) / roundTo) * roundTo;
};

// https://stackoverflow.com/questions/5837572/generate-a-random-point-within-a-circle-uniformly
const getRandomPointInCircle = (radius: number): Point => {
  const t = 2 * Math.PI * Math.random();
  const u = Math.random() + Math.random();
  let r = null;
  if (u > 1) {
    r = 2-u;
  } else {
    r = u 
  }

  return {
    x: roundToNum(radius * r * Math.cos(t), 4),
    y: roundToNum(radius * r * Math.sin(t), 4),
  };
}

export {
  roundToNum,
  getRandomPointInCircle
};
