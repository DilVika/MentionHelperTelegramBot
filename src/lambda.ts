import type {
  // Context,
  APIGatewayProxyEventV2,
  Handler,
  APIGatewayProxyStructuredResultV2,
} from 'aws-lambda'
import initBot from './bot'

export const handler: Handler = async (
  event: APIGatewayProxyEventV2,
  // context: Context,
): Promise<APIGatewayProxyStructuredResultV2> => {
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
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error processing update',
        error,
      }),
    }
  }
}
