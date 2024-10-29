import { getValidUserIdFromMessage } from '../misc/utils'
import { REJECT_USER_ID } from '../configs/constants'
import DynamoDB from '../db/dynamoDb'
import { CmdHandlerProps } from '../types'
import { userMentionBuilder } from '../helpers/userContentBuilder'

export const subscribeHandler = async ({ message, bot }: CmdHandlerProps) => {
  const groupId = message.chat.id.toString()
  const subscriber = message.from
  const subscriberValidId = getValidUserIdFromMessage(message)
  if (subscriberValidId !== REJECT_USER_ID && subscriber) {
    await DynamoDB.putSubscription({
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
  } else {
    await bot.sendMessage(groupId, 'Not able to subscribe user')
  }
}
