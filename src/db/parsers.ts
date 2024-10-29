import { DynamoDBUserTopicSubscription, UserTopicSubscription } from '../types'

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
