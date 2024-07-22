import { useAtom } from 'jotai'
import { modalOpenAtom } from '../store/atoms'

const MenuBar: React.FC = () => {
  const [modalOpen, setModalOpen] = useAtom(modalOpenAtom)

  const openSettings = () => {
    setModalOpen(true)
  }

  return (
    <div className="bg-background-950/15 w-full flex items-center">
      <button
        className="hover:bg-background-800 duration-400 ease-in-out px-2 py-0.5 text-sm"
        onClick={openSettings}
        disabled={modalOpen}
      >
        Settings
      </button>
    </div>
  )
}

export default MenuBar
