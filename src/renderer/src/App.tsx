import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { FilesSection } from './components/files-section'
import Header from './components/header'
import Layout from './components/layout'
import SettingsModal from './components/settings-modal'
import { countAtom, filesAtom, globalFormatAtom, modalOpenAtom, savePathAtom } from './store/atoms'

function App(): JSX.Element {
  const [modalOpen] = useAtom(modalOpenAtom)
  const [, setSavePath] = useAtom(savePathAtom)
  const [files, setFiles] = useAtom(filesAtom)
  const [globalFormat] = useAtom(globalFormatAtom)
  const [, setCount] = useAtom(countAtom)

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

  return (
    <Layout>
      <Header />
      <FilesSection />
      {modalOpen && <SettingsModal />}
    </Layout>
  )
}

export default App
