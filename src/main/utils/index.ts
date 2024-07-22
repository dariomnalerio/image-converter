import { app } from 'electron'
import * as path from 'path'

const userDataPath = app.getPath('userData')
const settingsPath = path.join(userDataPath, 'settings.json')
const imagesDir = path.join(userDataPath, 'images')

export function getSettingsPath() {
  return settingsPath
}

export function getImagesDir() {
  return imagesDir
}
