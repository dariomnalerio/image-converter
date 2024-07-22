import MenuBar from './menu-bar'

type LayoutProps = {
  children: React.ReactNode
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col">
      <MenuBar />
      {children}
    </div>
  )
}

export default Layout
