import { NO_MSG_CONTENT } from '../configs/constants.js'
import DynamoDB from '../db/dynamoDb.js'
import { userMentionBuilderById } from '../helpers/userContentBuilder.js'
import { CmdHandlerProps } from '../types.js'

export const tagAllHandler = async ({ message, bot }: CmdHandlerProps) => {
  const chatId = message.chat.id
  const tagList = await DynamoDB.getAllSubscriptions({
    groupId: chatId.toString(),
  })

  if (tagList?.length === 0) {
    await bot.sendMessage(chatId, NO_MSG_CONTENT)
  } else {
    const mentions = tagList
      ?.filter((el) => el.userId !== (message.from?.id ?? 0).toString())
      .map((tag) =>
        userMentionBuilderById(tag.userId, tag.userName || 'NoName'),
      )

    const messageText = message.text?.split(' ')
    const finalMessage = `Hey ${mentions?.join(' ')}, ${messageText?.slice(1).join(' ')}`
    await bot.sendMessage(chatId, finalMessage, {
      parse_mode: 'MarkdownV2',
    })
  }
}
