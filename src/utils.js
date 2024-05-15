import { MAX_CAT_IMG_VARIATIONS } from "./constants.js";

export const getRandomInt = (max) => Math.floor(Math.random() * max);

// To prevent random uuid for each request cause Telegram cache useless and make too much request to cat api
// This function will return a random number in a range instead of a random uuid
export const cacheListBuilder = () => getRandomInt(MAX_CAT_IMG_VARIATIONS);
