import path from 'path'
import sharp from 'sharp'
import { getSavePath } from './settings'

export async function convertImage({ filePath, format }) {
  try {
    const savePath = await getSavePath()

    const outputDir = savePath || path.dirname(filePath)
    const outputFileName = `${path.basename(filePath, path.extname(filePath))}.${format}`
    const outputPath = path.join(outputDir, outputFileName)
    await sharp(filePath).toFormat(format).toFile(outputPath)

    return { success: true, outputPath }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { success: false, error: error!.message }
  }
}
