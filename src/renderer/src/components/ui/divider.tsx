import { cn } from '@renderer/utils'

type DividerProps = {
  className?: string
}

const Divider = ({ className }: DividerProps) => {
  return <div className={cn('w-full bg-background-200 h-1 rounded-r-md rounded-l-md', className)}></div>
}

export { Divider }
