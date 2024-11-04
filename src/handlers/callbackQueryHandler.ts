import TelegramBot from 'node-telegram-bot-api'
import commands from '../configs/commands'
import { subscribeHandler } from './commands/subscribeHandler'

export const callbackQueryHandler = async (
  botInstance: TelegramBot,
  query: TelegramBot.CallbackQuery,
) => {
  try {
    // TODO: Re-construct this function to handle callback queries if it grows
    const queryData = query.data
    const replyFromUser = query.from
    const originalMessage = query.message?.reply_to_message ?? {
      message_id: -1,
      date: new Date().getTime(),
      from: replyFromUser,
      chat: query.message?.chat ?? { id: -1, type: 'private' },
    }

    if (queryData?.match(commands.subscribe.callBackRegex ?? '*')) {
      const topicId = queryData?.match(
        commands.subscribe.callBackRegex ?? '*',
      )?.[1]

      // build the message for handler
      if (replyFromUser) {
        const message = {
          ...originalMessage,
          from: replyFromUser,
          text: `/subscribe ${topicId}`,
        }
        await subscribeHandler({ message, bot: botInstance })
        await botInstance.answerCallbackQuery(query.id, {
          show_alert: true,
          text: 'Subscribed successfully to the topic: ' + topicId,
        })
      } else {
        await botInstance.answerCallbackQuery(query.id, {
          text: 'Cannot process your request',
        })
      }
    }
  } catch (error) {
    console.error(`Error processing callback query: ${error}`)
  }
}
