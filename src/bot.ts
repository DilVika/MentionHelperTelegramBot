// import { startCmdHandler } from './handlers/index.js'

const TOKEN = process.env.BOT_TOKEN || 'ccc'

import TelegramBot from 'node-telegram-bot-api'
import commands from './configs/commands'
import { commandHandler } from './handlers/commandHandler'
import {
  tagHandler,
  subscribeHandler,
  sendCatPicHandler,
  sendRicardoGifHandler,
  dizzHandler,
  helpHandler,
  startCmdHandler,
  sendCmdHandler,
  //   removeTrackingHandler,
} from './handlers/index'

import initAsync from './helpers/async'
import { callbackQueryHandler } from './handlers/callbackQueryHandler'

export default () => {
  const bot = new TelegramBot(TOKEN, {
    baseApiUrl: process.env.BASE_URL,
  })

  const asyncController = initAsync()

  const start = async () => {
    const promisify = asyncController.promisify

    // Handlers
    bot.onText(
      commands.start.regex,
      promisify({
        command: commands.start,
        bot,
        commandHandler,
        handler: startCmdHandler,
      }),
    )

    bot.onText(
      commands.send.regex,
      promisify({
        command: commands.send,
        bot,
        commandHandler,
        handler: sendCmdHandler,
      }),
    )

    // /all with message
    bot.onText(
      commands.tag.regex,
      promisify({
        command: commands.tag,
        bot,
        commandHandler,
        handler: tagHandler,
      }),
    )

    // Subscribe to all messages
    bot.onText(
      commands.subscribe.regex,
      promisify({
        command: commands.subscribe,
        bot,
        commandHandler,
        handler: subscribeHandler,
      }),
    )

    // Send random cute cat photo when user send /cat
    bot.onText(
      commands.cat.regex,
      promisify({
        command: commands.cat,
        bot,
        commandHandler,
        handler: sendCatPicHandler,
      }),
    )
    // Send Ricardo Milos GiF when user send /ricardo
    bot.onText(
      commands.ricardo.regex,
      promisify({
        command: commands.ricardo,
        bot,
        commandHandler,
        handler: sendRicardoGifHandler,
      }),
    )

    bot.onText(
      commands.dizz.regex,
      promisify({
        command: commands.dizz,
        bot,
        commandHandler,
        handler: dizzHandler,
      }),
    )

    bot.onText(
      commands.help.regex,
      promisify({
        command: commands.help,
        bot,
        commandHandler,
        handler: helpHandler,
      }),
    )

    bot.on('callback_query', promisify({ bot, callbackQueryHandler }))

    bot.on('polling_error', (error) => {
      console.log(error) // => 'EFATAL'
    })

    bot.on('webhook_error', (error) => {
      console.log(error) // => 'EPARSE'
    })

    const processUpdate = async (input: TelegramBot.Update) => {
      const msgId = input.message?.message_id
      if (!msgId && !input.callback_query) {
        console.log('No message id or callback_query')
        return
      }
      const promise = asyncController.createHangingPromise(
        msgId?.toString() ?? input.callback_query?.id ?? '',
      )
      bot.processUpdate(input)
      return promise
    }
    return { processUpdate }
  }
  return { start, botInstance: bot }
}
