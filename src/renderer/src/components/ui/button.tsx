import { cn } from '@renderer/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

const Button: React.FC<ButtonProps> = (props) => {
  const { className } = props
  return (
    <button
      {...props}
      className={cn(
        `inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background-300 bg-background-100 text-text-900 hover:bg-background-100/90 p-1.5 `,
        className
      )}
    />
  )
}

export { Button }
