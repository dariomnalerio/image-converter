import { Format } from '@shared/types'
import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const getErrorMessage = (error: string) => {
  if (error.includes('unable to open for write')) {
    return 'Could not find save directory. Please select a new one.'
  }

  return 'Unexpected error. Please try again or report an issue on GitHub.'
}

export const formats: Format[] = ['jpeg', 'png', 'webp']
