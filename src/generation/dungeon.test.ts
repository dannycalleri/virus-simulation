import { 
  generateDungeon,
  selectSuitableRooms,
} from "./Dungeon";
import { Rectangle } from "../compiler/types";

test('generateDungeon called with 20 generates a dungeon with 20 rooms', () => {
  const rooms = generateDungeon(20);
  expect(rooms.length).toBe(20);
});

test('selectSuitableRooms should select rooms above threshold', () => {
  const rooms: Rectangle[] = [
    { x: 0, y: 0, width: 40, height: 40 },
    { x: 0, y: 0, width: 20, height: 20 },
    { x: 0, y: 0, width: 5, height: 5 },
    { x: 0, y: 0, width: 20, height: 20 },
    { x: 0, y: 0, width: 100, height: 100 },
    { x: 0, y: 0, width: 30, height: 30 },
  ];
  const suitableRooms = selectSuitableRooms(rooms);
  expect(suitableRooms).toEqual([
    { x: 0, y: 0, width: 100, height: 100 },
  ]);
});
