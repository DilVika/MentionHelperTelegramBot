// Define the type for the commands object
interface Command {
  regex: RegExp
  desc: string
}

type Commands = {
  [key: string]: Command
}

import commands from '../configs/commands'
import { CmdHandlerProps } from '../types'

export const startCmdHandler = async ({
  message: msg,
  bot,
}: CmdHandlerProps) => {
  try {
    const chatId = msg.chat.id
    const message = `Hello ${msg?.from?.first_name}!`

    const privateCommands = Object.keys(commands)
      .filter(
        (key) =>
          commands[key].scope === 'private' || commands[key].scope === 'all',
      )
      .map((key) => ({
        command: `${key}`,
        description: (commands as Commands)[key].desc,
      }))

    const groupCommands = Object.keys(commands)
      .filter(
        (key) =>
          commands[key].scope === 'group' ||
          commands[key].scope === 'supergroup' ||
          commands[key].scope === 'all',
      )
      .map((key) => ({
        command: `${key}`,
        description: (commands as Commands)[key].desc,
      }))

    await bot.sendMessage(chatId, message)
    await bot.setMyCommands([])

    if (msg.chat.type === 'private') {
      await bot.setMyCommands(privateCommands, {
        scope: {
          type: 'all_private_chats',
        },
      })
    } else if (msg.chat.type === 'group' || msg.chat.type === 'supergroup') {
      await bot.setMyCommands(groupCommands, {
        scope: {
          type: 'all_group_chats',
        },
      })
    }
    // const settedCommandList = await bot.getMyCommands({
    //   type: 'default',
    // })
    // await bot.sendMessage(
    //   chatId,
    //   `Commands set: ${settedCommandList.map((command) => command.command).join(', ')}`,
    // )
  } catch (error) {
    console.error(error)
  }
}
