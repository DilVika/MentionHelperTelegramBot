import { catImgProvider } from '../configs/constants.js'
import { cacheListBuilder } from '../misc/utils'
import { CmdHandlerProps } from '../types/types.js'

export const sendCatPicHandler = async ({ message, bot }: CmdHandlerProps) => {
  const chatId = message.chat.id
  const randomCatPhoto = `${catImgProvider}?antiCache=${cacheListBuilder()}`
  await bot.sendPhoto(chatId, randomCatPhoto)
}
