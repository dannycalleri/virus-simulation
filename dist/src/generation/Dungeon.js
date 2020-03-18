import { getRandomPointInCircle } from "./functions";
function generateDungeon(numberOfRooms) {
    const rooms = [];
    for (let i = 0; i < numberOfRooms; i++) {
        const point = getRandomPointInCircle(100);
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
function selectSuitableRooms(rooms) {
    const totalWidth = rooms.reduce((acc, current) => acc + current.width, 0);
    const totalHeight = rooms.reduce((acc, current) => acc + current.height, 0);
    const widthThreshold = (totalWidth / rooms.length) * 1.25;
    const heightThreshold = (totalHeight / rooms.length) * 1.25;
    return rooms.filter((r) => {
        return r.width > widthThreshold && r.height > heightThreshold;
    });
}
export { generateDungeon, selectSuitableRooms, };
//# sourceMappingURL=Dungeon.js.map