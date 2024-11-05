import { ConnectorFactory } from '../data_sources/connector_factory'
import { parseDataSourceItem, uniqueSubscriptions } from './parsers'
import { UserTopicSubscription } from '../types/types'
import { SubscriptionEntity } from '../data_sources/entities/SubscriptionWEntity'

export class SubscriptionRepository {
  private connector: ReturnType<ConnectorFactory['getConnector']>

  constructor() {
    this.connector = new ConnectorFactory().getConnector()
  }

  async createSubscription({
    groupId,
    topicName = 'DEFAULT_TOPIC_NAME',
    userId,
    userName,
  }: {
    groupId: string
    topicName?: string
    userId: string
    userName?: string
  }): Promise<void> {
    const entity = {
      GroupID: groupId,
      'TopicID#UserID': `${topicName}#${userId}`,
      UserName: userName,
      Timestamp: new Date().toISOString(),
    }

    await this.connector.create(entity)
  }

  async getAllSubscriptionsByGroup(
    groupId: string,
  ): Promise<UserTopicSubscription[]> {
    const data = await this.connector.findAllBy<SubscriptionEntity>({
      key: 'GroupID',
      value: groupId,
    })
    return data.map((e) => parseDataSourceItem(e))
  }

  async getSubscriptionsByGroupAndTopic({
    groupId,
    topicName,
  }: {
    groupId: string
    topicName: string
  }): Promise<UserTopicSubscription[]> {
    const data = await this.connector.findAllBy<SubscriptionEntity>(
      {
        key: 'GroupID',
        value: groupId,
      },
      {
        key: 'TopicID#UserID',
        value: topicName,
        operator: 'begins_with',
      },
    )

    return uniqueSubscriptions(data.map((e) => parseDataSourceItem(e)))
  }
}
