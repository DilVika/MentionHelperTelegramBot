import commands from "../commands.js";

export const helpHandler = (msg, bot) => {
  const chatId = msg.chat.id;
  const message = Object.keys(commands)
    .map((key) => {
      const command = commands[key];
      return `/${key} - ${command.desc}`;
    })
    .join("\n");
  bot.sendMessage(chatId, message);
};
