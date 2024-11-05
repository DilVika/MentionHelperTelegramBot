import TelegramBot from 'node-telegram-bot-api'

export interface CmdHandlerProps {
  message: TelegramBot.Message
  query?: TelegramBot.CallbackQuery
  bot: TelegramBot
}

export interface UserTopicSubscription {
  groupId: string
  topicId: string
  userId: string
  userName?: string
  subscribedAt: Date
}
