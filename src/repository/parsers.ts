import { SubscriptionEntity } from '../data_sources/entities/SubscriptionWEntity'
import { UserTopicSubscription } from '../types/types'

export const parseDataSourceItem = (
  item: SubscriptionEntity,
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
