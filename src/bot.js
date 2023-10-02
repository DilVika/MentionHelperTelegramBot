// Env. Only Need for development
// import dotenv from "dotenv";
// dotenv.config();
const TOKEN = process.env.BOT_TOKEN || "YOUR_TELEGRAM_BOT_TOKEN";

import TelegramBot from "node-telegram-bot-api";
import { userMentionBuilder } from "./helpers/userContentBuilder.js";
import commands from "./commands.js";
import {
  CHILL_STICKER_FILE_ID,
  NO_MSG_CONTENT,
  catImgProvider,
  ricardoMilosGifProvider,
} from "./constants.js";
import { v4 as uuid } from "uuid";
import { getRandomInt } from "./uils.js";
import { rickRollHandler } from "./handlers/rickrollHandler.js";

const bot = new TelegramBot(TOKEN);

// Handlers
bot.onText(/\/start/, async (msg) => {
  try {
    const chatId = msg.chat.id;
    const message = `Hello ${msg.from.first_name}!`;
    bot.sendMessage(chatId, message);
    await bot.setMyCommands([]);
    bot.setMyCommands(
      Object.keys(commands).map((key) => ({
        command: `${key}`,
        description: commands[key].desc,
      })),
    );
  } catch (error) {
    console.error(error);
  }
});

// /all with message
bot.onText(commands.all.regex, async (msg) => {
  if (getRandomInt(10) < 2) {
    rickRollHandler(msg, bot);
  } else {
    const chatId = msg?.chat?.id;

    const rawMessageContent = msg?.text?.split(" ").slice(1).join(" ");
    const messageContent = rawMessageContent || NO_MSG_CONTENT;

    try {
      // Get members admins of group
      const adminMembers = await bot.getChatAdministrators(chatId);
      const botInfo = await bot.getMe();

      // Create list members to tag
      const toTaggedUsernames = adminMembers
        .filter(
          (member) =>
            member?.user?.id !== undefined &&
            member?.user?.id !== msg.from.id &&
            member?.user?.is_bot !== true,
        )
        .map((member) => userMentionBuilder(member.user))
        .join(" ");

      const doBotCanDeleteMessage = adminMembers.some(
        (member) => member?.user?.id === botInfo?.id,
      );

      if (toTaggedUsernames.length > 0) {
        // Get tagger
        const tagger = userMentionBuilder(msg.from);
        const tagNotification = `Hey ${toTaggedUsernames}, \n${tagger} *said*:\n _${messageContent}_`;

        if (doBotCanDeleteMessage) {
          await bot.deleteMessage(chatId, msg.message_id.toString());
        }

        bot.sendMessage(chatId, tagNotification, { parse_mode: "MarkdownV2" });
      } else {
        bot.sendMessage(chatId, "No members to tag.");
      }
    } catch (error) {
      console.error(error);
    }
  }
});

// Send random cute cat photo when user send /cat
bot.onText(commands.cat.regex, async (msg) => {
  if (getRandomInt(10) < 2) {
    rickRollHandler(msg, bot);
  } else {
    const chatId = msg.chat.id;
    const randomCatPhoto = `${catImgProvider}?antiCache=${uuid()}`;
    bot.sendPhoto(chatId, randomCatPhoto);
  }
});

// Send Ricardo Milos GiF when user send /ricardo
bot.onText(commands.ricardo.regex, async (msg) => {
  if (getRandomInt(10) < 2) {
    rickRollHandler(msg, bot);
  } else {
    const chatId = msg.chat.id;
    bot.sendDocument(chatId, ricardoMilosGifProvider);
  }
});

bot.onText(commands.dizz.regex, async (msg) => {
  if (getRandomInt(10) < 2) {
    rickRollHandler(msg, bot);
  } else {
    const chatId = msg.chat.id;
    const dizzer = userMentionBuilder(msg.from);

    bot.sendMessage(chatId, `${dizzer} said: Ditmeconmonleo`, {
      parse_mode: "Markdown",
    });
    bot.sendSticker(chatId, CHILL_STICKER_FILE_ID);
  }
});

bot.onText(commands.help.regex, async (msg) => {
  if (getRandomInt(10) < 2) {
    rickRollHandler(msg, bot);
  } else {
    const chatId = msg.chat.id;
    const message = Object.keys(commands)
      .map((key) => {
        const command = commands[key];
        return `/${key} - ${command.desc}`;
      })
      .join("\n");
    bot.sendMessage(chatId, message);
  }
});

export default bot;
