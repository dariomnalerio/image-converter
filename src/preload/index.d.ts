import { OpenDialogReturnValue } from 'electron'

declare global {
  interface Window {
    // electron: ElectronAPI
    context: {
      convertImage: (
        filePath: string,
        format: string
      ) => Promise<{ success: boolean; error?: string; outputPath?: string }>
      openDirectoryDialog: () => Promise<OpenDialogReturnValue>
      openFile: () => Promise<string | null>
      savePath: (path: string) => Promise<void>
      getSavePath: () => Promise<string | null>
      openFiles: (format: string) => Promise<
        | {
            canceled: false
            files: {
              path: string
              name: string
              converted: 'success' | 'error' | 'pending' | 'none'
              outputFormat: 'jpeg' | 'png' | 'webp'
            }[]
          }
        | {
            canceled: boolean
            files: never[]
          }
      >
    }
  }
}
