import type {
  // Context,
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2,
} from 'aws-lambda'
import { initBot } from './bot'
import { TELE_SECRET_HEADER_KEY } from './configs/constants'

export const handler = async (
  event: APIGatewayProxyEventV2,
  // context: Context,
): Promise<APIGatewayProxyStructuredResultV2> => {
  const TELE_SECRET = process.env.TELE_SECRET
  const header = event.headers[TELE_SECRET_HEADER_KEY]
  if (header !== TELE_SECRET) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        message: 'Unauthorized access',
      }),
    }
  }

  const request = event.body ?? ''
  const parsedData = JSON.parse(request)

  const botWrapper = initBot()
  const bot = await botWrapper.start()
  const instance = botWrapper.botInstance

  try {
    await bot.processUpdate(parsedData)
    instance.removeAllListeners()

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Bot informed about this input correctly',
        input: event,
      }),
    }
  } catch (error) {
    console.error('Error processing update', error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error processing update',
        error,
      }),
    }
  }
}
