import TelegramBot from 'node-telegram-bot-api'

export interface CmdHandlerProps {
  message: TelegramBot.Message
  bot: TelegramBot
}

export interface UserTopicSubscription {
  groupId: string
  topicId: string
  userId: string
  userName?: string
  subscribedAt: Date
}

// DynamoDB
export interface DynamoDBUserTopicSubscription {
  GroupID: string
  'TopicID#UserID': string
  UserName?: string
  Timestamp: string
}
