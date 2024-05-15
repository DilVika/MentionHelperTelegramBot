import { ricardoMilosGifProvider } from "../constants.js";

export const sendRicardoGifHandler = (msg, bot) => {
  const chatId = msg.chat.id;
  bot.sendDocument(chatId, ricardoMilosGifProvider);
};
