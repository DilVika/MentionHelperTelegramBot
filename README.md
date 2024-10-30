# Mention Helper Telegram Bot

## Overview

This project is a Telegram bot built using Node.js, TypeScript, and the Serverless Framework. It is designed to help manage mentions in Telegram groups.

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

4. Run the bot locally with `yarn dev`

## Deployment

1. Configure your AWS credentials.
2. Deploy the bot with `yarn deploy`

## Linting

Run ESLint with `yarn lint`

## References

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Serverless Framework](https://www.serverless.com/)
- [Serverless Offline](https://www.serverless.com/plugins/serverless-offline)
- [DynamoDB](https://aws.amazon.com/dynamodb/)
- [Node-Telegram-Bot-API](https://github.com/yagop/node-telegram-bot-api)
- [TypeScript](https://www.typescriptlang.org/)
