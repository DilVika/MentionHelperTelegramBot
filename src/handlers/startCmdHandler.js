import commands from "../commands.js";

export const startCmdHandler = async (msg, bot) => {
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
};
