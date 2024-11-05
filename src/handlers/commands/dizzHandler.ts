import { CHILL_STICKER_FILE_ID } from '../../configs/constants'
import { userMentionBuilder } from '../../helpers/userContentBuilder'
import { CmdHandlerProps } from '../../types/types'

export const dizzHandler = async ({ message: msg, bot }: CmdHandlerProps) => {
  const chatId = msg.chat.id
  const dizzer = userMentionBuilder(msg.from)

  await bot.sendMessage(chatId, `${dizzer} said: Ditmeconmonleo`, {
    parse_mode: 'Markdown',
  })
  await bot.sendSticker(chatId, CHILL_STICKER_FILE_ID)
}
