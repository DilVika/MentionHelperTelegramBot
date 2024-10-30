import {
  ANY_COMMAND_REGEX,
  NO_MSG_CONTENT,
  SINGLE_SPACE_STR,
} from '../configs/constants.js'
import DynamoDB from '../db/dynamoDb.js'
import { uniqueSubscriptions } from '../db/parsers.js'
import { userMentionBuilderById } from '../helpers/userContentBuilder.js'
import { CmdHandlerProps, UserTopicSubscription } from '../types/types.js'

export const tagHandler = async ({ message, bot }: CmdHandlerProps) => {
  const chatId = message.chat.id

  let tagList: UserTopicSubscription[] = []

  // Build tag list by topic
  const commandContent = message.text?.replace(ANY_COMMAND_REGEX, '')
  const topics = commandContent
    ?.split(SINGLE_SPACE_STR)
    .filter((topic) => topic)

  if ((topics?.length ?? 0) == 0 || (topics?.length ?? 0) > 1) {
    tagList = uniqueSubscriptions(
      await DynamoDB.getAllSubscriptions({
        groupId: chatId.toString(),
      }),
    )
  } else {
    tagList = await DynamoDB.getSubscriptionsByTopic({
      groupId: chatId.toString(),
      topicName: topics![0],
    })
  }

  // Build mentions message
  if (tagList?.length === 0) {
    await bot.sendMessage(chatId, NO_MSG_CONTENT)
  } else {
    const mentions = tagList
      ?.filter((el) => el.userId !== (message.from?.id ?? 0).toString())
      .map((tag) =>
        userMentionBuilderById(tag.userId, tag.userName || 'NoName'),
      )

    const finalMessage = `Hey ${mentions?.join(' ')}`
    await bot.sendMessage(chatId, finalMessage, {
      parse_mode: 'Markdown',
    })
  }
}
