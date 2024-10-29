export type Command = {
  regex: RegExp
  desc: string
  scope: CommandScope
}

export type CommandScope = 'private' | GroupCommandScope | 'all'
export type GroupCommandScope = 'group' | 'supergroup'

const commands: Record<string, Command> = {
  start: {
    regex: /\/start/,
    desc: 'Start',
    scope: 'all',
  },
  subscribe: {
    regex: /\/subscribe/,
    desc: 'Subscribe to all messages',
    scope: 'supergroup',
  },
  all: {
    regex: /\/all/,
    desc: 'Tag all users in group with message',
    scope: 'supergroup',
  },
  cat: {
    regex: /\/cat/,
    desc: 'Send random cute cat photo',
    scope: 'all',
  },
  ricardo: {
    regex: /\/ricardo/,
    desc: 'Send Ricardo Milos GiF',
    scope: 'all',
  },
  dizz: {
    regex: /\/dizz/,
    desc: 'Dizz Mon Leo',
    scope: 'all',
  },
  help: {
    regex: /\/help/,
    desc: 'Show all commands',
    scope: 'all',
  },
  link: {
    regex: /\/link/,
    desc: 'Remove tracking link',
    scope: 'all',
  },
} as const

export default commands
