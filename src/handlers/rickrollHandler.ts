import { rickRollGifProvider } from '../configs/constants'
import { CmdHandlerProps } from '../types'

// Randomly rickrolls a user by sending a gif of Rick Astley's Never Gonna Give You Up
export const rickRollHandler = async ({
  message: msg,
  bot,
}: CmdHandlerProps) => {
  const chatId = msg.chat.id
  await bot.deleteMessage(chatId, msg.message_id)
  await bot.sendDocument(chatId, rickRollGifProvider)
}
