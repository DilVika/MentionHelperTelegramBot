// Env. Only Need for development
// import dotenv from "dotenv";
// dotenv.config();
const TOKEN = process.env.BOT_TOKEN || "YOUR_TELEGRAM_BOT_TOKEN";

import TelegramBot from "node-telegram-bot-api";
import commands from "./commands.js";
import { commandHandler } from "./handlers/handler.js";
import { dizzHandler } from "./handlers/dizzHandler.js";
import { helpHandler } from "./handlers/helpHandler.js";
import { sendCatPicHandler } from "./handlers/sendCatPicHandler.js";
import { sendRicardoGifHandler } from "./handlers/sendRicardoGifHandler.js";
import { tagAllHandler } from "./handlers/tagAllHandler.js";
import { startCmdHandler } from "./handlers/startCmdHandler.js";
import { removeTrackingHandler } from "./handlers/removeTrackingHandler.js";

const bot = new TelegramBot(TOKEN);

// Handlers
bot.onText(commands.start.regex, async (msg) =>
  commandHandler(msg, bot, startCmdHandler),
);

// /all with message
bot.onText(commands.all.regex, async (msg) =>
  commandHandler(msg, bot, tagAllHandler),
);

// Send random cute cat photo when user send /cat
bot.onText(commands.cat.regex, async (msg) =>
  commandHandler(msg, bot, sendCatPicHandler),
);

// Send Ricardo Milos GiF when user send /ricardo
bot.onText(commands.ricardo.regex, async (msg) =>
  commandHandler(msg, bot, sendRicardoGifHandler),
);

bot.onText(commands.dizz.regex, async (msg) =>
  commandHandler(msg, bot, dizzHandler),
);

bot.onText(commands.help.regex, async (msg) =>
  commandHandler(msg, bot, helpHandler),
);

// /remove tracking link
bot.onText(commands.link.regex, async (msg) =>
  commandHandler(msg, bot, removeTrackingHandler),
);

export default bot;
