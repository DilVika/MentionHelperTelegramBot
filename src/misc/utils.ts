import TelegramBot from 'node-telegram-bot-api'
import { MAX_CAT_IMG_VARIATIONS, REJECT_USER_ID } from '../configs/constants'

export const getRandomInt = (max: number) => Math.floor(Math.random() * max)

// To prevent random uuid for each request cause Telegram cache useless and make too much request to cat api
// This function will return a random number in a range instead of a random uuid
export const cacheListBuilder = () => getRandomInt(MAX_CAT_IMG_VARIATIONS)

export const getValidUserIdFromMessage = (msg: TelegramBot.Message): number =>
  msg?.from?.is_bot ? REJECT_USER_ID : (msg?.from?.id ?? REJECT_USER_ID)
