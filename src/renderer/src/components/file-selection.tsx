import { errorAtom, filesAtom, globalFormatAtom, modalOpenAtom, savePathAtom } from '@renderer/store/atoms'
import { getErrorMessage } from '@renderer/utils'
import { Format } from '@shared/types'
import { useAtom } from 'jotai'
import { IoOpenOutline } from 'react-icons/io5'
import { Button, Divider, Select } from './ui'

const FileSelection = () => {
  const [globalFormat, setGlobalFormat] = useAtom(globalFormatAtom)
  const [files, setFiles] = useAtom(filesAtom)
  const [, setModalOpen] = useAtom(modalOpenAtom)
  const [savePath] = useAtom(savePathAtom)
  const [, setError] = useAtom(errorAtom)

  const handleChooseFilesClick = async (event: React.MouseEvent) => {
    if (!savePath) {
      event.preventDefault()
      setModalOpen(true)
      return
    }

    const result = await window.context.openFiles(globalFormat)

    if (result.canceled || !result.files.length) {
      return
    }

    const files = result.files

    setFiles(files)
  }

  const handleConvert = async () => {
    for (const file of files) {
      setFiles((prevFiles) =>
        prevFiles.map((f) => (f.path === file.path ? { ...f, converted: 'pending' as const } : f))
      )

      const response = await window.context.convertImage(file.path, file.outputFormat)

      if (!response.success) {
        const error = getErrorMessage(response.error as string)
        setError(error)
      }
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.path === file.path ? { ...f, converted: response.success ? ('success' as const) : ('error' as const) } : f
        )
      )
    }
  }

  const handleOpenSaveDir = async () => {
    if (!savePath) {
      setModalOpen(true)
      return
    }

    await window.context.openDirectory(savePath)
  }

  const convertString = files.length > 1 ? 'Convert files' : 'Convert file'

  return (
    <div className="flex flex-col gap-3 py-5 px-4 font-semibol">
      <div className="flex gap-5 items-center justify-between">
        <div className="flex gap-5">
          <Button onClick={handleChooseFilesClick}>Select Files</Button>
          <Select value={globalFormat} onChange={(e) => setGlobalFormat(e.target.value as Format)}>
            <option value="jpeg">JPEG</option>
            <option value="png">PNG</option>
            <option value="webp">WebP</option>
          </Select>
          <Button
            onClick={handleConvert}
            disabled={files.length === 0 || !savePath}
            className="bg-primary-400 hover:bg-primary-400/90 font-semibold w-32"
          >
            {convertString}
          </Button>
        </div>
        <Button
          className="bg-background-100 hover:bg-background-100/90 p-1 px-2 flex gap-2 items-center justify-center"
          onClick={handleOpenSaveDir}
        >
          Open save folder
          <IoOpenOutline className="h-6 w-6 text-text-700" />
        </Button>
      </div>
      <Divider className="mt-1.5" />
    </div>
  )
}

export default FileSelection
