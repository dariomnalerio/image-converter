import { File, Format } from '@shared/types'
import { dialog, shell } from 'electron'
import path from 'path'

export async function selectDirectoryDialog(): Promise<string | null> {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory'],
    buttonLabel: 'Select Directory'
  })
  if (!canceled) {
    return filePaths[0]
  }
  return null
}

export async function selectFiles(format: Format) {
  const result = await dialog.showOpenDialog({
    title: 'Select files',
    properties: ['openFile', 'multiSelections'],
    filters: [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'webp'] }]
  })

  if (result.canceled) {
    return {
      canceled: true,
      files: []
    }
  }

  const files: File[] = result.filePaths.map((filePath) => {
    const name = path.basename(filePath)
    return {
      path: filePath,
      name,
      converted: 'none' as const,
      outputFormat: format
    }
  })

  const newResponse = {
    canceled: result.canceled,
    files
  }
  return newResponse
}

export async function openDirectory(path: string) {
  try {
    await shell.openPath(path)
  } catch (error) {
    console.error(error)
  }
}
