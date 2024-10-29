// import { startCmdHandler } from './handlers/index.js'

const TOKEN = process.env.BOT_TOKEN || 'ccc'

import TelegramBot from 'node-telegram-bot-api'
import commands from './configs/commands'
import { commandHandler } from './handlers/handler'
import {
  tagAllHandler,
  subscribeHandler,
  sendCatPicHandler,
  sendRicardoGifHandler,
  dizzHandler,
  helpHandler,
  startCmdHandler,
  //   removeTrackingHandler,
} from './handlers/index'

import initAsync from './helpers/async'

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
      promisify(commands.start, bot, commandHandler, startCmdHandler),
    )

    // /all with message
    bot.onText(
      commands.all.regex,
      promisify(commands.all, bot, commandHandler, tagAllHandler),
    )

    // Subscribe to all messages
    bot.onText(
      commands.subscribe.regex,
      promisify(commands.subscribe, bot, commandHandler, subscribeHandler),
    )

    // Send random cute cat photo when user send /cat
    bot.onText(
      commands.cat.regex,
      promisify(commands.cat, bot, commandHandler, sendCatPicHandler),
    )
    // Send Ricardo Milos GiF when user send /ricardo
    bot.onText(
      commands.ricardo.regex,
      promisify(commands.ricardo, bot, commandHandler, sendRicardoGifHandler),
    )

    bot.onText(
      commands.dizz.regex,
      promisify(commands.dizz, bot, commandHandler, dizzHandler),
    )

    bot.onText(
      commands.help.regex,
      promisify(commands.help, bot, commandHandler, helpHandler),
    )

    // /remove tracking link
    // bot.onText(commands.link.regex, async (msg) =>
    //   commandHandler(msg, bot, removeTrackingHandler),
    // )

    bot.on('polling_error', (error) => {
      console.log(error) // => 'EFATAL'
    })

    bot.on('webhook_error', (error) => {
      console.log(error) // => 'EPARSE'
    })

    const processUpdate = async (input: TelegramBot.Update) => {
      const msgId = input.message?.message_id
      if (!msgId) {
        console.log('No message id')
        return
      }
      const promise = asyncController.createHangingPromise(msgId.toString())
      bot.processUpdate(input)
      return promise
    }
    return { processUpdate }
  }
  return { start, botInstance: bot }
}
