declare module 'minimist-string' {
  interface ParsedArgs {
    _: string[]
    [key: string]: string | boolean | number | string[] | undefined
  }

  function parse(input: string): ParsedArgs

  export = parse
}
