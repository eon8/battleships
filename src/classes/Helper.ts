import {Area, Size} from "./Ship";

export function getRandomInt(min: number, max: number) {
  return Math.round(Math.random() * (max - min)) + min;
}

export function generateArea(size: Size): Area {
  return new Array(size.height).fill(0).map(() => {
    return new Array(size.width).fill(0);
  });
}