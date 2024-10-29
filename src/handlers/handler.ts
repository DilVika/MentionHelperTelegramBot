import { RICK_ROLL_THRESHOLD, WRONG_CHAT_TYPE_MSG } from '../configs/constants'
import { rickRollHandler } from './rickrollHandler'
import { getRandomInt } from '../misc/utils'
import TelegramBot from 'node-telegram-bot-api'
import { CmdHandlerProps } from '../types'
import { Command } from '../configs/commands'

export const commandHandler = async (
  command: Command,
  msg: TelegramBot.Message,
  botInstance: TelegramBot,
  handler: ({ message, bot }: CmdHandlerProps) => Promise<void>,
) => {
  if (getRandomInt(100) < RICK_ROLL_THRESHOLD * 10) {
    await rickRollHandler({ message: msg, bot: botInstance })
  } else {
    const chatType = msg.chat.type
    if (command.scope === 'all' || chatType === command.scope) {
      await handler({ message: msg, bot: botInstance })
    } else {
      await botInstance.sendMessage(
        msg.chat.id,
        `${WRONG_CHAT_TYPE_MSG}: ${chatType}`,
      )
    }
  }
}
