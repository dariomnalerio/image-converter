import { useAtom } from 'jotai'
import { useState } from 'react'
import { modalOpenAtom, savePathAtom } from '../store/atoms'
import { Button } from './ui'

const SettingsModal: React.FC = () => {
  const [modalOpen, setModalOpen] = useAtom(modalOpenAtom)
  const [error, setError] = useState('')
  const [savePath, setSavePath] = useAtom(savePathAtom)
  const [savePathState, setSavePathState] = useState(savePath)

  if (!modalOpen) return null

  const handleCancel = () => {
    if (!savePath) {
      if (savePathState) {
        setError('Please save the settings before closing')
      } else {
        setError('Please select a directory')
      }

      return
    }

    setModalOpen(false)
  }

  const handleSaveSettings = async () => {
    if (!savePathState) {
      return
    }

    setSavePath(savePathState)
    await window.context.savePath(savePathState)
    setModalOpen(false)
  }

  const handleChooseDirectory = async () => {
    try {
      const filePath = await window.context.openFile()
      if (filePath) {
        setError('')
        setSavePathState(filePath)
      } else if (filePath === null) {
        setSavePathState('')
        setError('Please select a directory')
      } else {
        setSavePathState('')
        setError('Failed to open directory')
      }
    } catch (error) {
      console.error('Failed to open directory dialog:', error)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-background-900 p-8 min-h-[500px] min-w-[700px] rounded-md shadow-lg flex  flex-col">
        <div className="flex-1">
          <h2 className="text-lg font-bold mb-2">Settings</h2>
          <div className="w-full bg-background-200 h-1 rounded-r-md rounded-l-md"></div>
          {/* Settings */}
          <div className="mt-6">
            <div className="flex items-center gap-5 w-full justify-between">
              <div className="flex-1">
                <label className="text-sm font-bold">Save location</label>
                {typeof savePathState === 'string' && (
                  <p className="text-sm truncate max-w-full mt-2 ml-0.5">{savePathState}</p>
                )}
              </div>
              <Button onClick={handleChooseDirectory} className="mt-5">
                Change directory
              </Button>
            </div>

            <div className="mt-2">
              {error && <p className="text-secondary-300 text-sm ml-2">{error}</p>}
              {!savePathState && !error && <p className="text-sm ml-2">No directory selected</p>}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-10">
          <Button
            className="bg-primary-400 hover:bg-primary-400/90 px-4 rounded-md text-text-900"
            onClick={handleSaveSettings}
          >
            Save
          </Button>
          <Button
            className="ml-2 bg-secondary-300 hover:bg-secondary-300/90 px-4 rounded-md text-text-900 font-medium"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal
