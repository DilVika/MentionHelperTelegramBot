import { CHILL_STICKER_FILE_ID } from "../constants.js";
import { userMentionBuilder } from "../helpers/userContentBuilder.js";

export const dizzHandler = (msg, bot) => {
  const chatId = msg.chat.id;
  const dizzer = userMentionBuilder(msg.from);

  bot.sendMessage(chatId, `${dizzer} said: Ditmeconmonleo`, {
    parse_mode: "Markdown",
  });
  bot.sendSticker(chatId, CHILL_STICKER_FILE_ID);
};
