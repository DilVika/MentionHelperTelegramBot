import { UserTopicSubscription } from '../types/types'

export interface ISubscriptionRepository {
  makeSubscription: ({
    groupId,
    userId,
    topicName,
    userName,
  }: {
    groupId: string
    userId: string
    topicName?: string
    userName?: string
  }) => Promise<void>
  //TODO: Implement this method
  //removeSubscription: (chatId: number, tag: string) => Promise<void>
  getAllSubscriptionsByGroup: ({
    groupId,
    topicName,
  }: {
    groupId: string
    topicName?: string
  }) => Promise<UserTopicSubscription[]>

  getSubscriptionsByGroupAndTopic: ({
    groupId,
  }: {
    groupId: string
  }) => Promise<UserTopicSubscription[]>
}
