import commands from '../configs/commands'
import { CmdHandlerProps } from '../types'

export const helpHandler = async ({ message: msg, bot }: CmdHandlerProps) => {
  const chatId = msg.chat.id
  const message = (Object.keys(commands) as Array<keyof typeof commands>)
    .map((key) => {
      const command = commands[key]
      return `/${key} - ${command.desc}`
    })
    .join('\n')
  await bot.sendMessage(chatId, message)
}
