export interface Connector {
  findAllBy<T>(
    primary_key: {
      key: string
      value: string
    },
    secondary_key?: {
      key: string
      value: string
      operator?: SortKeyOptions
    },
  ): Promise<T[]>
  create<T>(data: T): Promise<void>
}

export type SortKeyOptions = 'begins_with' | 'between' | 'ends_with' | 'eq'
