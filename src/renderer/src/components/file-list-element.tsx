import { cn, formats } from '@renderer/utils'
import { File, Format } from '@shared/index'
import { MdDelete } from 'react-icons/md'
import SelectFormat from './select-format'
import { Button } from './ui'
type FileListElementProps = {
  file: File
  index: number
  onFileFormatChange: (index: number, format: Format) => void
  handleDelete: (filePath: string) => () => void
}

const FileListElement = ({ file, index, handleDelete, onFileFormatChange }: FileListElementProps) => {
  return (
    <li
      key={file.path}
      className={cn(
        `flex justify-between items-center w-full text-sm border border-background-800/80 bg-background-800/20 hover:bg-background-800/30 p-3 rounded-lg`,
        {
          'bg-green-800 hover:bg-green-800/90 animate-pulse ': file.converted === 'pending',
          'bg-red-900 hover:bg-red-800/90': file.converted === 'error',
          'bg-green-800 hover:bg-green-800/90': file.converted === 'success'
        }
      )}
    >
      <span>{file.name}</span>
      <div className="flex gap-2">
        <SelectFormat
          value={file.outputFormat}
          onChangeValue={(value) => onFileFormatChange(index, value as Format)}
          options={formats}
        />
        <Button className="bg-secondary-300 hover:bg-secondary-300/90" onClick={handleDelete(file.path)}>
          <MdDelete />
        </Button>
      </div>
    </li>
  )
}

export default FileListElement
