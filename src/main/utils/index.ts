import { app } from 'electron'
import fs from 'fs-extra'
import path from 'path'

const userDataPath = app.getPath('userData')
const settingsPath = path.join(userDataPath, 'settings.json')
const imagesDir = path.join(userDataPath, 'images')

export function getSettingsPath() {
  return settingsPath
}

export function getImagesDir() {
  return imagesDir
}

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

export async function getUniqueOutputPath(outputDir: string, baseName: string, extension: string) {
  let counter = 0
  let outputFileName = `${baseName}.${extension}`
  let outputPath = path.join(outputDir, outputFileName)

  while (await fileExists(outputPath)) {
    counter++
    outputFileName = `${baseName}-${counter}.${extension}`
    outputPath = path.join(outputDir, outputFileName)
  }

  return outputPath
}
