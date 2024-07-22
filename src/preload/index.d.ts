import { OpenDialogReturnValue } from 'electron'

declare global {
  interface Window {
    context: {
      convertImage: (
        filePath: string,
        format: string
      ) => Promise<{ success: boolean; error?: string; outputPath?: string }>
      openDirectoryDialog: () => Promise<OpenDialogReturnValue>
      selectDirectory: () => Promise<string | null>
      savePath: (path: string) => Promise<void>
      getSavePath: () => Promise<string | null>
      openFiles: (format: string) => Promise<OpenFilesReturnValue>
      openDirectory: (path: string) => Promise<void>
    }
  }
}
