import {
  ANY_COMMAND_REGEX,
  DUPLICATE_SPACE_REGEX,
  RICK_ROLL_THRESHOLD,
  SINGLE_SPACE_STR,
  WRONG_CHAT_TYPE_MSG,
} from '../configs/constants'
import { rickRollHandler } from './commands/rickrollHandler'
import { getRandomInt } from '../misc/utils'
import TelegramBot from 'node-telegram-bot-api'
import { CmdHandlerProps } from '../types/types'
import { Command } from '../configs/commands'

export const commandHandler = async (
  command: Command,
  msg: TelegramBot.Message,
  botInstance: TelegramBot,
  handler: ({ message, bot }: CmdHandlerProps) => Promise<void>,
) => {
  // Preprocess message
  const preProcessMessageText = msg.text
    ?.replace(DUPLICATE_SPACE_REGEX, SINGLE_SPACE_STR)
    .trim()

  const preProcessMessage = {
    ...msg,
    text: preProcessMessageText,
  }

  // Get command message, which is start after /command in the message. Then prevent any text after the command include / in it
  // Get All the text after the command. By using remove the first element
  const commandMessageContent = preProcessMessage.text?.replace(
    ANY_COMMAND_REGEX,
    '',
  )
  if (commandMessageContent?.match(/\/\w+/)) {
    await botInstance.sendMessage(
      preProcessMessage.chat.id,
      'Dont include / in your command content',
    )
    return
  }

  // Process message
  if (getRandomInt(100) < RICK_ROLL_THRESHOLD * 10) {
    await rickRollHandler({ message: preProcessMessage, bot: botInstance })
  } else {
    const chatType = preProcessMessage.chat.type
    if (command.scope === 'all' || chatType === command.scope) {
      await handler({ message: preProcessMessage, bot: botInstance })
    } else {
      await botInstance.sendMessage(
        preProcessMessage.chat.id,
        `${WRONG_CHAT_TYPE_MSG}: ${chatType}`,
      )
    }
  }
}
