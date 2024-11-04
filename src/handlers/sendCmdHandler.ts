import { ANY_COMMAND_REGEX } from '../configs/constants'
import { CmdHandlerProps } from '../types/types'

export const sendCmdHandler = async ({
  message: msg,
  bot,
}: CmdHandlerProps) => {
  try {
    const chatId = msg.chat.id
    const userId = msg.from?.id

    if (userId == process.env.OWNER_ID) {
      // /send groupId messageContent
      const [groupId, ...messageParts] =
        msg.text
          ?.replace(ANY_COMMAND_REGEX, '')
          .trim()
          .split(' ')
          .filter((content) => content) ?? []

      if (messageParts?.length === 0) {
        await bot.sendMessage(
          chatId,
          'Invalid command. Please use /send <groupId> <messageContent>',
        )
        return
      } else {
        const messageContent = messageParts.join(' ')

        await bot.sendMessage(groupId, messageContent)
        await bot.sendMessage(chatId, 'Message sent successfully')
      }
    } else {
      await bot.sendMessage(
        chatId,
        'You are not authorized to use this command',
      )
    }
    return
  } catch (error) {
    console.error(error)
  }
}
