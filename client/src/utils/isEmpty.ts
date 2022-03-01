export default (value: string
  | Record<string, any>
  | []
  | null
  | undefined): boolean => value === null
  || value === undefined
  || (typeof value === 'string' && value.trim().length === 0)
  || (typeof value === 'object' && Object.keys(value).length === 0);
