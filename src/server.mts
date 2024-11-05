/**
 * This example demonstrates setting up a webook, and receiving
 * updates in your express app
 * More information can be found in https://github.com/yagop/node-telegram-bot-api/blob/master/examples/webhook/express.js
 */
// "start:express": "nodemon --exec concurrently 'npx tsc -w --noEmit' 'ts-node --esm src/server.mts'"
import { initBot } from './bot'
import express from 'express'

const publicUrl = process.env.PUBLIC_HOST_URL //'https://<PUBLIC-URL>': This is the public URL of the deployed app and listen the requests from Telegram
const webhookPath = process.env.WEBHOOK_PATH || '/bot'
const url = `${publicUrl}${webhookPath}` // It will be look like https://<PUBLIC-URL>/webhook-path
const port = process.env.PORT

const botAsyncControl = initBot()
await botAsyncControl.start()
const bot = botAsyncControl.botInstance

bot.getWebHookInfo()

// This informs the Telegram servers of the new webhook.
bot.setWebHook(url)

const app = express()

// parse the updates to JSON
app.use(express.json())

// We are receiving updates at the route below!
app.post('webhookPath', (req, res) => {
  bot.processUpdate(req.body)
  res.sendStatus(200)
})

// Start Express Server
app.listen(port, () => {
  console.log(`Express server is listening on ${port}`)
})

// Just to ping!
bot.on('message', (msg) => {
  bot.sendMessage(msg.chat.id, 'I am alive!')
})
