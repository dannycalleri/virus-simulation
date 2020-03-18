import { getRandomPointInCircle } from "./functions";
import { 
  Point,
  Rectangle 
} from "../compiler/types";

function generateDungeon(numberOfRooms: number): Rectangle[] {
  const rooms: Rectangle[] = [];
  
  for(let i=0; i < numberOfRooms; i++) {
    const point: Point = getRandomPointInCircle(100);
    const room = {
      x: point.x,
      y: point.y,
      width: 10 + Math.floor(Math.random() * 100),
      height: 10 + Math.floor(Math.random() * 100),
    };
    rooms.push(room);
  }

  return rooms;
}

function selectSuitableRooms(rooms: Rectangle[]): Rectangle[] {
  const totalWidth = rooms.reduce((acc: number, current: Rectangle) => acc + current.width, 0);
  const totalHeight = rooms.reduce((acc: number, current: Rectangle) => acc + current.height, 0);
  const widthThreshold = (totalWidth / rooms.length) * 1.25;
  const heightThreshold = (totalHeight / rooms.length) * 1.25;
  return rooms.filter((r: Rectangle) => {
    return r.width > widthThreshold && r.height > heightThreshold;
  });
}

export {
  generateDungeon,
  selectSuitableRooms,
};
