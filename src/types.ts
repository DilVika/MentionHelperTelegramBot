import TelegramBot from 'node-telegram-bot-api'

export interface CmdHandlerProps {
  message: TelegramBot.Message
  bot: TelegramBot
}
