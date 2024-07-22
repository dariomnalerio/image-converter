import { File, Format } from '@shared/types'
import { atom } from 'jotai'

export const modalOpenAtom = atom(false)
export const savePathAtom = atom('')
export const filesAtom = atom<File[]>([])
export const globalFormatAtom = atom<Format>('jpeg')
export const errorAtom = atom('')
export const countAtom = atom(0)
