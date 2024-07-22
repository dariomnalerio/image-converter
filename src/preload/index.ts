import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    convertImage: (filePath, format) => ipcRenderer.invoke('convert-image', { filePath, format }),
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
    savePath: (path) => ipcRenderer.invoke('save-path', path),
    getSavePath: () => ipcRenderer.invoke('get-save-path'),
    openFiles: (format) => ipcRenderer.invoke('dialog:openFiles', format)
  })
} catch (error) {
  console.error(error)
}
