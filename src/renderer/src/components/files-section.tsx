import { countAtom, errorAtom, filesAtom } from '@renderer/store/atoms'
import { Format } from '@shared/types'
import { useAtom } from 'jotai'
import FileListElement from './file-list-element'

const FilesSection = () => {
  const [files, setFiles] = useAtom(filesAtom)
  const [error] = useAtom(errorAtom)
  const [count] = useAtom(countAtom)

  const onFileFormatChange = (index: number, format: Format) => {
    const newFiles = [...files]
    newFiles[index].outputFormat = format
    setFiles(newFiles)
  }

  const handleDelete = (filePath: string) => {
    return () => {
      const newFiles = files.filter((file) => file.path !== filePath)
      setFiles(newFiles)
    }
  }

  return (
    <>
      {error && <div className="text-secondary-400 px-4">{error}</div>}
      {files.length > 0 && (
        <div className="py-5 px-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">{files.length} selected files</h3>
            <span>
              {count} / {files.length} converted
            </span>
          </div>
          <ul className="mt-2 flex flex-col gap-2 h-[75vh] overflow-auto">
            {files.map((file, index) => (
              <FileListElement
                key={file.path}
                file={file}
                index={index}
                onFileFormatChange={onFileFormatChange}
                handleDelete={handleDelete}
              />
            ))}
          </ul>
        </div>
      )}
      {files.length === 0 && (
        <div className="flex justify-center items-center text-xl font-semibold mt-48">No files selected</div>
      )}
    </>
  )
}

export { FilesSection }
