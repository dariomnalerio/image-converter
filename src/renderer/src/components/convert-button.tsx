import { filesAtom, globalFormatAtom } from '@renderer/store/atoms'
import { useAtom } from 'jotai'
import { Button } from './ui'

const ConvertButton = () => {
  const [files] = useAtom(filesAtom)
  const [globalFormat] = useAtom(globalFormatAtom)

  const handleConvert = async () => {
    for (const file of files) {
      const filePath = file.path
      const response = await window.context.convertImage(filePath, globalFormat)
      if (response.success) {
        alert(`Image ${file.name} converted successfully! Saved at: ${response.outputPath}`)
      } else {
        alert(`Error converting ${file.name}: ${response.error}`)
      }
    }
  }
  return <Button onClick={handleConvert}>Convert file(s)</Button>
}

export default ConvertButton
