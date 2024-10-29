import { User } from 'node-telegram-bot-api'

export const userMentionBuilder = (user?: User) => {
  if (!user) {
    return ''
  }
  // If first_name is not available, use @username
  if (
    user.first_name &&
    user.first_name.trim().length > 0 &&
    user.first_name.replace(/[\u3164]/g, '').length > 0
  ) {
    return `[${user.first_name}](tg://user?id=${user.id})`
  }

  return `@${user.username}`
}

export const userMentionBuilderById = (
  userId: string | number,
  displayName: string,
) => {
  return `[${displayName}](tg://user?id=${userId})`
}
