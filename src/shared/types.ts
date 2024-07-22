export type Format = 'jpeg' | 'png' | 'webp'
export type Converted = 'success' | 'error' | 'pending' | 'none'
export type File = {
  path: string
  name: string
  outputFormat: Format
  converted: Converted
}

export type OpenFilesReturnValue =
  | {
      canceled: false
      files: File[]
    }
  | {
      canceled: true
      files: never[]
    }
