import { getValidUserIdFromMessage } from '../../misc/utils'
import {
  ANY_COMMAND_REGEX,
  REJECT_USER_ID,
  SINGLE_SPACE_STR,
} from '../../configs/constants'
import { CmdHandlerProps } from '../../types/types'
import { userMentionBuilder } from '../../helpers/userContentBuilder'
import TelegramBot, { InlineKeyboardButton } from 'node-telegram-bot-api'

import minimistS from 'minimist-string'
import { SubscriptionRepository } from '../../repository/SubscriptionRepository'

export const subscribeHandler = async ({ message, bot }: CmdHandlerProps) => {
  const repo = new SubscriptionRepository()

  const groupId = message.chat.id
  const subscriber = message.from
  const subscriberValidId = getValidUserIdFromMessage(message)

  // Process with command

  // .call is used to bind the context of the function to the object. Prevents error when calling the function
  const args = minimistS.call({ prefix: 'ncc' }, message.text ?? '')
  // Output the parsed arguments to inspect the structure

  if (args.l || args.list) {
    const allSubs = await repo.getAllSubscriptionsByGroup(groupId.toString())

    const topicsList = Array.from(new Set(allSubs.map((sub) => sub.topicId)))

    const opts = {
      reply_to_message_id: message.message_id,
      reply_markup: {
        // build topic list into inline keyboard. Each button is a topic
        // 3 topics per row
        inline_keyboard: topicsList.reduce<InlineKeyboardButton[][]>(
          (acc, curr, index) => {
            if (index % 2 === 0) acc.push([])
            acc[acc.length - 1].push({
              text: curr,
              callback_data: `subscribe:${curr}`,
            })
            return acc
          },
          [],
        ),
      },
    }

    await bot.sendMessage(
      groupId,
      'Current available Topics in this group are:\n',
      opts,
    )

    return
  }

  // Get topics to subscribe
  const commandContent = message.text?.replace(ANY_COMMAND_REGEX, '')
  const topics = commandContent
    ?.split(SINGLE_SPACE_STR)
    .filter((topic) => topic)

  // Prevent bots from subscribing
  if (subscriberValidId !== REJECT_USER_ID && subscriber) {
    // Subscribe topics
    if ((topics?.length ?? 0) == 0) {
      await _subscribeSingleTopic(
        groupId.toString(),
        subscriberValidId,
        bot,
        repo,
        subscriber,
      )
    } else if ((topics?.length ?? 0) > 5) {
      await bot.sendMessage(
        groupId,
        'You can only subscribe to a maximum of 5 topics each time',
      )
    } else {
      await _subscribeMultipleTopics(
        topics,
        groupId.toString(),
        subscriberValidId,
        subscriber,
        bot,
        repo,
      )
    }
  } else {
    await bot.sendMessage(groupId, 'Not able to subscribe user')
  }
}

async function _subscribeMultipleTopics(
  topics: string[] | undefined,
  groupId: string,
  subscriberValidId: number,
  subscriber: TelegramBot.User,
  bot: TelegramBot,
  dataSource: SubscriptionRepository,
) {
  const isValidTopics = topics?.every((topic) => {
    // Check if topic is valid
    // Valid topics are non-empty strings, only contain alphanumeric characters, and have a length of 1-20 characters
    return /^[a-zA-Z0-9]{1,20}$/.test(topic)
  })

  if (isValidTopics) {
    topics?.forEach(async (topic) => {
      await dataSource.createSubscription({
        groupId,
        userId: subscriberValidId.toString(),
        userName: subscriber?.username ?? subscriber?.first_name,
        topicName: topic,
      })
    })
    await bot.sendMessage(
      groupId,
      `User ${userMentionBuilder(subscriber)} subscribed to group`,
      {
        parse_mode: 'MarkdownV2',
      },
    )
  } else {
    await bot.sendMessage(
      groupId,
      'Invalid topics. Topics should only contain alphanumeric characters and have a length of 1-20 characters',
    )
  }
}

async function _subscribeSingleTopic(
  groupId: string,
  subscriberValidId: number,
  bot: TelegramBot,
  dataSource: SubscriptionRepository,
  subscriber?: TelegramBot.User,
) {
  await dataSource.createSubscription({
    groupId,
    userId: subscriberValidId.toString(),
    userName: subscriber?.username ?? subscriber?.first_name,
  })

  await bot.sendMessage(
    groupId,
    `User ${userMentionBuilder(subscriber)} subscribed to group`,
    {
      parse_mode: 'MarkdownV2',
    },
  )
}
