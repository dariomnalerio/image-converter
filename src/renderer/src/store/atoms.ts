import { File } from '@renderer/types'
import { atom } from 'jotai'

export const modalOpenAtom = atom(false)
export const savePathAtom = atom('')
export const filesAtom = atom<File[]>([])
export const globalFormatAtom = atom<'jpeg' | 'png' | 'webp'>('jpeg')
export const errorAtom = atom('')
