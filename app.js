

const TOKEN = process.env.BOT_TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN';

import express from 'express';
import TelegramBot from 'node-telegram-bot-api';
import bodyParser from 'body-parser';

const app = express()

const bot = new TelegramBot(TOKEN);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post(`/tagAllBot`, (req, res) => {
  console.log('Doing Start.... req.body: ', req.body);
  bot.processUpdate(req.body);
  res.sendStatus(200);
}
);

bot.onText(/\/start/, async (msg) => {

  console.log('do start: ', msg);

  const chatId = msg?.chat?.id;
  const message = `Hello ${msg?.from?.first_name}!`;
  bot.sendMessage(chatId, message);
});

// Just to ping!
bot.onText(/\/tagall/, async (msg) => {
  const chatId = msg?.chat?.id;

  //console.log('do tag all: ', chatId);
  try {
      // Get members admins of group
      const members = await bot.getChatAdministrators(chatId);

      // Create list members to tag
      const memberUsernames = members
          .filter(member => member?.user?.id !== undefined && member?.user?.id !== msg.from.id)
          .map(member => userMentionBuilder(member.user))
          .join(' ');

      if (memberUsernames.length > 0) {
          // Get tagger
          const tagger = userMentionBuilder(msg.from);
          const message = `${tagger} has mentioned: ${memberUsernames}`;
          bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
      } else {
          bot.sendMessage(chatId, "No members to tag.");
      }


  } catch (error) {
      console.error(error);
  }
});

bot.onText(/\/dizz/, async (msg) => {
  const chatId = msg.chat.id;
  console.log('do dizz: ', msg)
  const dizzer = userMentionBuilder(msg.from);
  // bot.sendMessage(chatId, 'Ditmeconmonleo :D');
  bot.sendMessage(chatId, `${dizzer} said: Ditmeconmonleo`, { parse_mode: 'Markdown' });
});

// Send random cute cat photo when user send /cat
bot.onText(/\/cat/, async (msg) => {
  const chatId = msg?.chat?.id;
  const randomCatPhoto = 'https://cataas.com/cat/hello';
  bot.sendPhoto(chatId, randomCatPhoto);
});

// Send Ricardo Milos GiF when user send /ricardo
bot.onText(/\/ricardo/, async (msg) => {
  const chatId = msg?.chat?.id;
  const ricardoMilosGif = 'https://tenor.com/5Mdo.gif';
  bot.sendDocument(chatId, ricardoMilosGif);
});

const userMentionBuilder = (user) => {
  // if first_name is not available, use @username
  if (user.first_name && user.first_name.trim().length > 0 && user.first_name.replace(/[\u3164]/g, '').length > 0) {
      return `[${user.first_name}](tg://user?id=${user.id})`;
  } else {
      return `@${user.username}`;
  }
}

export default app;
