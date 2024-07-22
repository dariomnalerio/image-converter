import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import FileSelection from './components/file-selection'
import Layout from './components/layout'
import SelectFormat from './components/select-format'
import SettingsModal from './components/settings-modal'
import { Button } from './components/ui'
import { errorAtom, filesAtom, globalFormatAtom, modalOpenAtom, savePathAtom } from './store/atoms'
import { Format } from './types'
import { cn } from './utils'

function App(): JSX.Element {
  const [modalOpen] = useAtom(modalOpenAtom)
  const [, setSavePath] = useAtom(savePathAtom)
  const [files, setFiles] = useAtom(filesAtom)
  const [globalFormat] = useAtom(globalFormatAtom)
  const [error] = useAtom(errorAtom)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const fetchSavePath = async () => {
      try {
        const path = await window.context.getSavePath()
        if (!path) {
          return
        }
        setSavePath(path)
      } catch (error) {
        console.error('Error fetching save path:', error)
      }
    }

    fetchSavePath()
  }, [])

  useEffect(() => {
    const newFiles = files.map((file) => {
      return { ...file, outputFormat: globalFormat }
    })
    setFiles(newFiles)
  }, [globalFormat])

  useEffect(() => {
    const convertedFiles = files.filter((file) => file.converted === 'success').length
    setCount(convertedFiles)
  }, [files])

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
    <Layout>
      <div>
        <FileSelection />
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
                      options={['jpeg', 'png', 'webp']}
                    />
                    <Button className="bg-secondary-300 hover:bg-secondary-300/90" onClick={handleDelete(file.path)}>
                      <MdDelete />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {modalOpen && <SettingsModal />}
    </Layout>
  )
}

export default App
