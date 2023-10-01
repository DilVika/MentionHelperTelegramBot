export const userMentionBuilder = (user) => {
  // If first_name is not available, use @username
  if (
    user.first_name &&
    user.first_name.trim().length > 0 &&
    user.first_name.replace(/[\u3164]/g, "").length > 0
  ) {
    return `[${user.first_name}](tg://user?id=${user.id})`;
  }

  return `@${user.username}`;
};
