import { catImgProvider } from "../constants.js";
import { cacheListBuilder } from "../utils.js";

export const sendCatPicHandler = (msg, bot) => {
  const chatId = msg.chat.id;
  const randomCatPhoto = `${catImgProvider}?antiCache=${cacheListBuilder()}`;
  bot.sendPhoto(chatId, randomCatPhoto);
};
