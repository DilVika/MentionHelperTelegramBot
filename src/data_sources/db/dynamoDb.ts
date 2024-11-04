// Init and Implement methods to interact with DynamoDB

import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { DynamoDB as dynamoDb } from '@aws-sdk/client-dynamodb'
import { DEFAULT_TOPIC_NAME, DYNAMODB_TABLE } from '../../configs/constants'
import {
  DynamoDBUserTopicSubscription,
  UserTopicSubscription,
} from '../../types/types'
import { parseDynamoDBItem } from '../parsers'
import { ISubscriptionRepository } from '../repositories'

export class SubscriptionRepository implements ISubscriptionRepository {
  // constructor to initialize the DynamoDB instance
  constructor() {
    this._instance = DynamoDBDocument.from(
      new dynamoDb({
        region: 'eu-west-2',
        endpoint: process.env.DYNAMODB_ENDPOINT,
      }),
    )
  }

  _instance: DynamoDBDocument

  _TopicIdUserId = (topicName: string, userId: string) =>
    `${topicName}#${userId}`

  async makeSubscription({
    groupId,
    topicName = DEFAULT_TOPIC_NAME,
    userId,
    userName,
  }: {
    groupId: string
    topicName?: string
    userId: string
    userName?: string
  }): Promise<void> {
    const params = {
      TableName: DYNAMODB_TABLE,
      Item: {
        GroupID: groupId,
        'TopicID#UserID': this._TopicIdUserId(topicName, userId),
        UserName: userName,
        Timestamp: new Date().toISOString(),
      },
    }

    try {
      await this._instance.put(params)
    } catch (error) {
      console.error('Error writing db: ', error)
    }
  }

  // getAllSubscriptionsByGroup: (
  //   chatId: number,
  // ) => Promise<UserTopicSubscription[]>
  async getSubscriptionsByGroupAndTopic({
    groupId,
    topicName,
  }: {
    groupId: string
    topicName?: string
  }): Promise<UserTopicSubscription[]> {
    const params = {
      TableName: DYNAMODB_TABLE,
      KeyConditionExpression:
        'GroupID = :groupId AND begins_with(#TopicUserID, :topicId)',
      ExpressionAttributeNames: {
        '#TopicUserID': 'TopicID#UserID', // Alias for 'TopicID#UserID'
      },
      ExpressionAttributeValues: {
        ':groupId': groupId,
        ':topicId': topicName,
      },
    }

    try {
      const data = await this._instance.query(params)
      return (
        (data.Items as DynamoDBUserTopicSubscription[])?.map((item) =>
          parseDynamoDBItem(item),
        ) || []
      )
    } catch (error) {
      console.error('Error reading db: ', error)
      return []
    }
  }

  async getAllSubscriptionsByGroup({
    groupId,
  }: {
    groupId: string
  }): Promise<UserTopicSubscription[]> {
    const params = {
      TableName: DYNAMODB_TABLE,
      KeyConditionExpression: 'GroupID = :groupId',
      ExpressionAttributeValues: {
        ':groupId': groupId,
      },
    }

    try {
      const data = await this._instance.query(params)
      return (
        (data.Items as DynamoDBUserTopicSubscription[])?.map((item) =>
          parseDynamoDBItem(item),
        ) || []
      )
    } catch (error) {
      console.error('Error reading db: ', error)
      return []
    }
  }
}
