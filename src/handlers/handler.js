import { RICK_ROLL_THRESHOLD } from "../constants.js";
import { rickRollHandler } from "./rickrollHandler.js";
import { getRandomInt } from "../utils.js";

export const commandHandler = (msg, botInstance, handler) => {
  if (getRandomInt(100) < RICK_ROLL_THRESHOLD * 10) {
    rickRollHandler(msg, botInstance);
  } else {
    handler(msg, botInstance);
  }
};
