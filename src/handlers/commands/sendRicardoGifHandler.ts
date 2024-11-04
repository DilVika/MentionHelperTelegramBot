import { ricardoMilosGifProvider } from '../../configs/constants'
import { CmdHandlerProps } from '../../types/types'

export const sendRicardoGifHandler = async ({
  bot,
  message,
}: CmdHandlerProps) => {
  const chatId = message.chat.id
  await bot.sendDocument(chatId, ricardoMilosGifProvider)
}
