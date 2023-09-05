import {similar} from "./archipanion.js";

let ids = await similar("auto", 10);
console.log("ids", ids);
