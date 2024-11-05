import { Connector } from './connector'
import { DynamoConnector } from './db/dynamo'

export class ConnectorFactory {
  getEnvValByKey(key: string): string {
    return process.env[key] || ''
  }

  getConnector(): Connector {
    switch (this.getEnvValByKey('DB_TYPE')) {
      case 'dynamodb':
        return new DynamoConnector()
      default:
        throw new Error('Invalid DB_TYPE')
    }
  }
}
