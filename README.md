# Mention Helper Telegram Bot

## Overview

Very Quick way to mention all users in a group or by a topic.

This bot is built with Node.js and TypeScript using the Serverless Framework for deployment on AWS. It uses DynamoDB for data storage.

## Features

- Mention all users in a group
- Built with Node.js 18 and TypeScript 5.1
- Uses Serverless Framework or AWS (you choose it) for deployment on AWS
- Local development with serverless-offline
- DynamoDB integration for data storage

## Prerequisites

- Node.js 18.x
- Yarn package manager
- AWS account and credentials configured

## Installation

1. Clone the repository
2. Install dependencies with `yarn`
3. Create a `.env` file in the root directory with the following environment variables

```
BOT_TOKEN=your_telegram_bot_token
```

4. Run the bot locally with `yarn start:sls` for Serverless offline or `yarn start` for Express server

## Deployment

### Serverless Framework

1. Install the Serverless Framework.
2. Set up your AWS credentials.
3. Start local development with `sls offline`
4. Deploy the project with `sls deploy`

Note:

- Since 1.0.0, I dropped the support for Serverless Framework. If you want to use it, please use the 0.5.0- version.

### AWS SAM

1. Install the AWS SAM CLI
2. Start local development with `sam local start-api` or `yarn start:aws`
3. Deploy the project with `sam deploy --guided`

### Express Server

1. Build the project with `yarn build`
2. Deploy using /dist folder onto your server

## References

- [TypeScript](https://www.typescriptlang.org/)
- [Node-Telegram-Bot-API](https://github.com/yagop/node-telegram-bot-api)
- [AWS SAM](https://aws.amazon.com/serverless/sam/)
- [Serverless Framework](https://www.serverless.com/)
- [Serverless Offline](https://www.serverless.com/plugins/serverless-offline)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [DynamoDB](https://aws.amazon.com/dynamodb/)
- [Express](https://expressjs.com/)
