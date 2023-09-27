
// import TelegramBot from 'node-telegram-bot-api';

// import { BOT_TOKEN } from './config.js';

// import express from 'express';

// const options = {
//     polling: true
// };
// const bot = new TelegramBot(BOT_TOKEN, options);

// bot.onText(/\/tagall/, async (msg) => {
//     const chatId = msg.chat.id;

//     try {
//         // Get members admins of group
//         const members = await bot.getChatAdministrators(chatId);

//         // Create list members to tag
//         const memberUsernames = members
//             .filter(member => member.user.id !== undefined && member.user.id !== msg.from.id)
//             .map(member => userMentionBuilder(member.user))
//             .join(' ');

//         if (memberUsernames.length > 0) {
//             // Get tagger
//             const tagger = userMentionBuilder(msg.from);
//             const message = `${tagger} has mentioned: ${memberUsernames}`;
//             bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
//         } else {
//             bot.sendMessage(chatId, "No members to tag.");
//         }


//     } catch (error) {
//         console.error(error);
//     }
// });

// bot.onText(/\/dizz/, async (msg) => {
//     const chatId = msg.chat.id;
//     bot.sendMessage(chatId, 'Ditmeconmonleo :D');
// });

// // Send random cute cat photo when user send /cat
// bot.onText(/\/cat/, async (msg) => {
//     const chatId = msg.chat.id;
//     const randomCatPhoto = 'https://cataas.com/cat/hello';
//     bot.sendPhoto(chatId, randomCatPhoto);
// });

// // Send Ricardo Milos GiF when user send /ricardo
// bot.onText(/\/ricardo/, async (msg) => {
//     const chatId = msg.chat.id;
//     const ricardoMilosGif = 'https://tenor.com/5Mdo.gif';
//     bot.sendDocument(chatId, ricardoMilosGif);
// });


// const userMentionBuilder = (user) => {
//     // if first_name is not available, use @username
//     if (user.first_name && user.first_name.trim().length > 0 && user.first_name.replace(/[\u3164]/g, '').length > 0) {
//         return `[${user.first_name}](tg://user?id=${user.id})`;
//     } else {
//         return `@${user.username}`;
//     }
// }