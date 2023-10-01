# MentionHelperTelegramBot

## Description
This is a telegram bot that helps you to mention all users in a group chat.

## How to use
### Basic usage
1. Add the bot to your group chat.
2. Set the bot as an administrator. (So that the bot can get the list of users in the group chat)
3. Type command with ```/tagall``` to mention all users in the group chat.

### Command list
- ```/tagall``` : Mention all users in the group chat.
- ```/cat``` : Send a random cat image.


## How to deploy
There are two ways to deploy this bot.
### Deploy on your own server
1. Clone this repository.
2. Install dependencies.
3. Set environment variables.
4. Deploy as a express server.

### Deploy on AWS Lambda
#### Prerequisites
- AWS account


#### Steps
1. Clone this repository.
2. Install dependencies.
3. Run ```sls deploy``` to deploy the bot on AWS Lambda.
4. Set environment variables on AWS Lambda.
