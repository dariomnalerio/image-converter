export type Format = 'jpeg' | 'png' | 'webp'

export interface File {
  path: string
  name: string
  outputFormat: Format
  converted: 'success' | 'error' | 'pending' | 'none'
}
