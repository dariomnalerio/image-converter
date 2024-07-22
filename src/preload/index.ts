import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    convertImage: (filePath, format) => ipcRenderer.invoke('convert-image', { filePath, format }),
    selectDirectory: () => ipcRenderer.invoke('dialog:select-directory'),
    savePath: (path) => ipcRenderer.invoke('save-path', path),
    getSavePath: () => ipcRenderer.invoke('get-save-path'),
    openFiles: (format) => ipcRenderer.invoke('dialog:open-files', format),
    openDirectory: (path) => ipcRenderer.invoke('open-directory', path)
  })
} catch (error) {
  console.error(error)
}
