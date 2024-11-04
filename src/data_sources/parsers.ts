import {
  DynamoDBUserTopicSubscription,
  UserTopicSubscription,
} from '../types/types'

export const parseDynamoDBItem = (
  item: DynamoDBUserTopicSubscription,
): UserTopicSubscription => {
  const [TopicID, UserID] = item['TopicID#UserID'].split('#')

  return {
    groupId: item.GroupID,
    topicId: TopicID,
    userId: UserID,
    userName: item.UserName,
    subscribedAt: new Date(item.Timestamp),
  }
}

export const uniqueSubscriptions = (items: UserTopicSubscription[]) => {
  const uniqueSubs = new Map<string, UserTopicSubscription>()

  items.forEach((item) => {
    uniqueSubs.set(item.userId, item)
  })

  return Array.from(uniqueSubs.values())
}
