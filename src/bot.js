/* eslint-disable capitalized-comments */
// Env. Only Need for development
import dotenv from "dotenv";
dotenv.config();
const TOKEN = process.env.BOT_TOKEN || "YOUR_TELEGRAM_BOT_TOKEN";

import TelegramBot from "node-telegram-bot-api";
import { userMentionBuilder } from "./helpers/userContentBuilder.js";
import commands from "./commands.js";
import {
  CHILL_STICKER_FILE_ID,
  catImgProvider,
  ricardoMilosGifProvider,
} from "./constants.js";
import { v4 as uuid } from "uuid";

const bot = new TelegramBot(TOKEN);

// Handlers
bot.onText(/\/start/, async (msg) => {
  // Console.log('do start command...');

  try {
    const chatId = msg.chat.id;
    const message = `Hello ${msg.from.first_name}!`;
    bot.sendMessage(chatId, message);
    // console.log(result);
  } catch (error) {
    console.error(error);
  }
});

// Just to ping!
bot.onText(commands.tagall.regex, async (msg) => {
  const chatId = msg?.chat?.id;

  try {
    // Get members admins of group
    const members = await bot.getChatAdministrators(chatId);

    // Create list members to tag
    const memberUsernames = members
      .filter(
        (member) =>
          member?.user?.id !== undefined && member?.user?.id !== msg.from.id,
      )
      .map((member) => userMentionBuilder(member.user))
      .join(" ");

    if (memberUsernames.length > 0) {
      // Get tagger
      const tagger = userMentionBuilder(msg.from);
      const message = `${tagger} has mentioned: ${memberUsernames}`;
      // eslint-disable-next-line camelcase
      bot.sendMessage(chatId, message, { parse_mode: "Markdown" });
    } else {
      bot.sendMessage(chatId, "No members to tag.");
    }
  } catch (error) {
    console.error(error);
  }
});

bot.onText(commands.dizz.regex, async (msg) => {
  const chatId = msg.chat.id;
  // Console.log('do dizz: ', msg)
  const dizzer = userMentionBuilder(msg.from);

  bot.sendMessage(chatId, `${dizzer} said: Ditmeconmonleo`, {
    // eslint-disable-next-line camelcase
    parse_mode: "Markdown",
  });
  bot.sendSticker(chatId, CHILL_STICKER_FILE_ID);
});

// Send random cute cat photo when user send /cat
bot.onText(commands.cat.regex, async (msg) => {
  const chatId = msg.chat.id;
  const randomCatPhoto = `${catImgProvider}?antiCache=${uuid()}`;
  bot.sendPhoto(chatId, randomCatPhoto);
});

// Send Ricardo Milos GiF when user send /ricardo
bot.onText(commands.ricardo.regex, async (msg) => {
  const chatId = msg.chat.id;
  bot.sendDocument(chatId, ricardoMilosGifProvider);
});

export default bot;
