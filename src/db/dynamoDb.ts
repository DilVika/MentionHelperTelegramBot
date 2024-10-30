// Init and Implement methods to interact with DynamoDB

import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { DynamoDB as dynamoDb } from '@aws-sdk/client-dynamodb'
import { DEFAULT_TOPIC_NAME, DYNAMODB_TABLE } from '../configs/constants'
import {
  DynamoDBUserTopicSubscription,
  UserTopicSubscription,
} from '../types/types'
import { parseDynamoDBItem, uniqueSubscriptions } from './parsers'

const dynamoDbIntance = DynamoDBDocument.from(
  new dynamoDb({
    region: 'eu-west-2',
    endpoint: process.env.DYNAMODB_ENDPOINT,
  }),
)

const TopicIdUserId = (topicName: string, userId: string) =>
  `${topicName}#${userId}`

const putSubscription = async ({
  groupId,
  topicName = DEFAULT_TOPIC_NAME,
  userId,
  userName,
}: {
  groupId: string
  topicName?: string
  userId: string
  userName?: string
}) => {
  const params = {
    TableName: DYNAMODB_TABLE,
    Item: {
      GroupID: groupId,
      'TopicID#UserID': TopicIdUserId(topicName, userId),

      UserName: userName,
      Timestamp: new Date().toISOString(),
    },
  }

  try {
    await dynamoDbIntance.put(params)
  } catch (error) {
    console.error('Error writing db: ', error)
  }
}

const getSubscriptionsByTopic = async ({
  groupId,
  topicName = DEFAULT_TOPIC_NAME,
}: {
  groupId: string
  topicName?: string
}): Promise<UserTopicSubscription[]> => {
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
    const data = await dynamoDbIntance.query(params)
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

const getAllSubscriptions = async ({
  groupId,
}: {
  groupId: string
}): Promise<UserTopicSubscription[]> => {
  const params = {
    TableName: DYNAMODB_TABLE,
    KeyConditionExpression: 'GroupID = :groupId',
    ExpressionAttributeValues: {
      ':groupId': groupId,
    },
  }

  try {
    const data = await dynamoDbIntance.query(params)
    return (
      uniqueSubscriptions(
        (data.Items as DynamoDBUserTopicSubscription[])?.map((item) =>
          parseDynamoDBItem(item),
        ),
      ) || []
    )
  } catch (error) {
    console.error('Error reading db: ', error)
    return []
  }
}

const deleteUserFromSubscription = async ({
  groupId,
  topicName = DEFAULT_TOPIC_NAME,
  userId,
}: {
  groupId: string
  topicName?: string
  userId: string
}) => {
  const params = {
    TableName: DYNAMODB_TABLE,
    Key: {
      GroupID: groupId,
      'TopicID#UserID': TopicIdUserId(topicName, userId),
    },
  }

  try {
    await dynamoDbIntance.delete(params)
  } catch (error) {
    console.error('Error deleting db: ', error)
  }
}

const deleteAllSubscriptionsByUser = async ({
  groupId,
  userId,
}: {
  groupId: string
  userId: string
}) => {
  //TODO
}

const DynamoDB = {
  putSubscription,
  getSubscriptionsByTopic,
  getAllSubscriptions,
  deleteUserFromSubscription,
}

export default DynamoDB
