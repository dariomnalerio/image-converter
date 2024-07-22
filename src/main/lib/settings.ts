import { getImagesDir, getSettingsPath } from '@/utils'
import { app, dialog } from 'electron'
import fs from 'fs-extra'

const userDataPath = app.getPath('userData')

export async function getSavePath() {
  try {
    const settingsPath = getSettingsPath()

    const settingsExist = await fs.pathExists(settingsPath)

    if (!settingsExist) {
      console.warn(`Settings file not found at ${settingsPath}`)
      return userDataPath
    }

    const settings: { savePath?: string } = await fs.readJson(settingsPath, { throws: false })

    if (typeof settings.savePath !== 'string') {
      console.warn(`Invalid savePath format in settings: ${JSON.stringify(settings.savePath)}`)
      return userDataPath
    }

    return settings.savePath || userDataPath
  } catch (error) {
    console.error('Error reading settings file:', error)
    // @ts-ignore: Ignore TypeScript error for 'unknown' type of 'error'
    dialog.showErrorBox('Error Reading Settings', `An error occurred while reading settings:\n${error.message}`)
    return null
  }
}

export async function savePath(_event, savePath: string) {
  const settingsPath = getSettingsPath()
  try {
    const settings = {
      savePath: savePath
    }

    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error saving settings:', error)
    // @ts-ignore: Ignore TypeScript error for 'unknown' type of 'error'
    dialog.showErrorBox('Error Saving Settings', `An error occurred while saving settings:\n${error.message}`)
  }
}

export async function initializeSettingsAndDirectories() {
  try {
    const imagesDir = getImagesDir()
    const settingsPath = getSettingsPath()

    await fs.ensureDir(imagesDir)

    const settingsExist = await fs.pathExists(settingsPath)

    if (!settingsExist) {
      const initialSettings = {
        savePath: imagesDir
      }

      await fs.writeJson(settingsPath, initialSettings, { spaces: 2 })(
        `Created initial settings file at ${settingsPath}`
      )
    }
  } catch (error) {
    console.error('Error initializing app:', error)
    // @ts-ignore: Ignore TypeScript error for 'unknown' type of 'error'
    dialog.showErrorBox('Initialization Error', `An error occurred during app initialization:\n${error.message}`)
  }
}
