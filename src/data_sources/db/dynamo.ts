import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { Connector, SortKeyOptions } from '../connector'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { DYNAMODB_TABLE } from '../../configs/constants'

export class DynamoConnector implements Connector {
  private _dynamoInstance: DynamoDBDocument

  constructor() {
    this._dynamoInstance = DynamoDBDocument.from(
      new DynamoDB({
        region: 'eu-west-2',
        endpoint: process.env.DYNAMODB_ENDPOINT,
      }),
    )
  }

  async findAllBy<T>(
    primary_key: {
      key: string
      value: string
    },
    secondary_key?: {
      key: string
      value: string
      condition?: SortKeyOptions
    },
  ): Promise<T[]> {
    const params: {
      TableName: string
      KeyConditionExpression: string
      ExpressionAttributeValues: { [key: string]: string }
      ExpressionAttributeNames?: { [key: string]: string }
    } = {
      TableName: DYNAMODB_TABLE,
      KeyConditionExpression: `${primary_key.key} = :v1`,
      ExpressionAttributeValues: {
        ':v1': primary_key.value,
      },
    }
    if (secondary_key) {
      if (secondary_key.condition === 'begins_with') {
        params.KeyConditionExpression += ` AND begins_with(#SecondKey, :v2)`
        params.ExpressionAttributeNames = {
          '#SecondKey': secondary_key.key,
        }
        params.ExpressionAttributeValues[':v2'] = secondary_key.value
      } else if (secondary_key.condition === 'ends_with') {
        params.KeyConditionExpression += ` AND contains(#SecondKey, :v2)`
        params.ExpressionAttributeNames = {
          '#SecondKey': secondary_key.key,
        }
        params.ExpressionAttributeValues[':v2'] = secondary_key.value
      } else {
        //TODO: Implement other conditions
      }
    }

    try {
      const { Items } = await this._dynamoInstance.query(params)
      return Items as T[]
    } catch (error) {
      console.error('Error reading dynamoDB: ', error)
      return []
    }
  }

  async create<T>(data: T): Promise<void> {
    const params = {
      TableName: DYNAMODB_TABLE,
      Item: data as Record<string, unknown>,
    }

    try {
      this._dynamoInstance.put(params)
    } catch (error) {
      console.error('Error writing dynamoDB: ', error)
    }
  }
}
