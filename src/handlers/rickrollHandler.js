import { ricardoMilosGifProvider } from "src/constants";

// Randomly rickrolls a user by sending a gif of Rick Astley's Never Gonna Give You Up
export const rickRollHandler = (msg, bot) => {
  const chatId = msg.chat.id;
  bot.sendDocument(chatId, ricardoMilosGifProvider);
};
