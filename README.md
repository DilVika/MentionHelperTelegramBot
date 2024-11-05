# Mention Helper Telegram Bot

## Overview

Very Quick way to mention all users in a group or by a topic.

This bot is built with Node.js and TypeScript using the Serverless Framework for deployment on AWS. It uses DynamoDB for data storage.

## Features

- Mention all users in a group
- Built with Node.js 18 and TypeScript 5.1
- Uses Serverless Framework for deployment on AWS
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

1. Configure your AWS credentials.
2. Deploy the bot with `yarn deploy`

### Express Server

1. Build the project with `yarn build`
2. Deploy using /dist folder onto your server

## References

- [TypeScript](https://www.typescriptlang.org/)
- [Node-Telegram-Bot-API](https://github.com/yagop/node-telegram-bot-api)
- [Serverless Framework](https://www.serverless.com/)
- [Serverless Offline](https://www.serverless.com/plugins/serverless-offline)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [DynamoDB](https://aws.amazon.com/dynamodb/)
- [Express](https://expressjs.com/)
