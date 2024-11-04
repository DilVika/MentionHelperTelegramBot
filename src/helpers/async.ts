import TelegramBot from 'node-telegram-bot-api'
import { CmdHandlerProps } from '../types/types'
import { Command } from '../configs/commands'

export default () => {
  const promises: { [key: string]: (value: unknown) => void } = {}
  const trigger = (id: number | string) => {
    promises[id](undefined)
    delete promises[id]
  }

  const createHangingPromise = (id: string) =>
    new Promise((resolve) => {
      promises[id] = resolve
    })

  // interface PromisifyFunction {
  //   (msg: TelegramBot.Message): Promise<void>
  // }

  type CommandHandlerParams = {
    command: Command
    bot: TelegramBot
    commandHandler: (
      command: Command,
      msg: TelegramBot.Message,
      bot: TelegramBot,
      handler: (props: CmdHandlerProps) => Promise<void>,
    ) => Promise<void>
    handler: (props: CmdHandlerProps) => Promise<void>
  }

  type CallbackQueryParams = {
    bot: TelegramBot
    callbackQueryHandler: (
      bot: TelegramBot,
      query: TelegramBot.CallbackQuery,
    ) => Promise<void>
  }

  type PromisifyParams = CommandHandlerParams | CallbackQueryParams

  const promisify =
    (params: PromisifyParams) =>
    async (content: TelegramBot.Message | TelegramBot.CallbackQuery) => {
      const msgId = 'message_id' in content ? content.message_id : content.id
      try {
        if ('message_id' in content) {
          if ('commandHandler' in params) {
            await params.commandHandler(
              params.command,
              content,
              params.bot,
              params.handler,
            )
          }
        } else if ('callbackQueryHandler' in params) {
          await params.callbackQueryHandler(params.bot, content)
        }
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
