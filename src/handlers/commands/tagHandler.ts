import {
  ANY_COMMAND_REGEX,
  NO_MSG_CONTENT,
  SINGLE_SPACE_STR,
} from '../../configs/constants'
import { SubscriptionRepository } from '../../data_sources/db/dynamoDb'
import { uniqueSubscriptions } from '../../data_sources/parsers'
import { userMentionBuilderById } from '../../helpers/userContentBuilder'
import { CmdHandlerProps, UserTopicSubscription } from '../../types/types'

export const tagHandler = async ({ message, bot }: CmdHandlerProps) => {
  const dataSource = new SubscriptionRepository()

  const chatId = message.chat.id

  let tagList: UserTopicSubscription[] = []

  // Build tag list by topic
  const commandContent = message.text?.replace(ANY_COMMAND_REGEX, '')
  const topics = commandContent
    ?.split(SINGLE_SPACE_STR)
    .filter((topic) => topic)

  if ((topics?.length ?? 0) == 0 || (topics?.length ?? 0) > 1) {
    tagList = uniqueSubscriptions(
      await dataSource.getAllSubscriptionsByGroup({
        groupId: chatId.toString(),
      }),
    )
  } else {
    tagList = await dataSource.getSubscriptionsByGroupAndTopic({
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
