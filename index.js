import {objects, similar} from "./archipanion.js";

let similarResult = await similar("auto", 10);
const ids = similarResult.map(r => r.key);
console.log("ids", ids);
let o = await ids(ids);
console.log("objects", o);
