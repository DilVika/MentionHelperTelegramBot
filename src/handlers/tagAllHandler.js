import { NO_MSG_CONTENT } from "../constants.js";
import { userMentionBuilder } from "../helpers/userContentBuilder.js";

export const tagAllHandler = async (msg, bot) => {
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
};
