export const COLORS = {
  primary: '#ff5c00',
  secondary: '#0557BA',
  'primary-light': '#FFF7F7',
  border: '#d9d9d9',
  surface: '#F5F6FA',
};

export const isEmpty = (value: string
  | Record<string, any>
  | []
  | null
  | undefined): boolean => typeof value === 'undefined'
  || value === null
  || (typeof value === 'object' && Object.keys(value).length === 0)
  || (typeof value === 'string' && !value.trim().length);
