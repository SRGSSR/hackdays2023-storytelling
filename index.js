import {ids, objects, similar} from "./archipanion.js";

let similarResult = await similar("auto", 10);
const keys = similarResult.map(r => r.key);
console.log("ids", keys);
let is = await ids(keys);
console.log("ids", is);
let os = await objects(is.map(i => i.objectId));
console.log("objects", os);
