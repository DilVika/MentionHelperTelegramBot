import TelegramBot from 'node-telegram-bot-api'
import { CmdHandlerProps } from '../types/types'
import { Command } from '../configs/commands'

export default () => {
  const promises: { [key: string]: (value: unknown) => void } = {}
  const trigger = (id: number) => {
    promises[id](undefined)
    delete promises[id]
  }

  const createHangingPromise = (id: string) =>
    new Promise((resolve) => {
      promises[id] = resolve
    })

  interface PromisifyFunction {
    (msg: TelegramBot.Message): Promise<void>
  }

  const promisify =
    (
      command: Command,
      bot: TelegramBot,
      commandHandler: (
        command: Command,
        msg: TelegramBot.Message,
        bot: TelegramBot,
        handler: (props: CmdHandlerProps) => Promise<void>,
      ) => Promise<void>,
      handler: (props: CmdHandlerProps) => Promise<void>,
    ): PromisifyFunction =>
    async (msg: TelegramBot.Message) => {
      const msgId = msg.message_id
      try {
        await commandHandler(command, msg, bot, handler)
      } catch (e) {
        console.error(`Error on handler: ${e}`)
      } finally {
        trigger(msgId)
      }
    }
  return {
    createHangingPromise,
    promisify,
  }
}
