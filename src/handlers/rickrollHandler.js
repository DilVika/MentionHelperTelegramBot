import { rickRollGifProvider } from "../constants.js";

// Randomly rickrolls a user by sending a gif of Rick Astley's Never Gonna Give You Up
export const rickRollHandler = async (msg, bot) => {
  const chatId = msg.chat.id;
  await bot.deleteMessage(chatId, msg.message_id.toString());
  bot.sendDocument(chatId, rickRollGifProvider);
};
