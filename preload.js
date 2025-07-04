const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  'api', 
  {
    getFilePaths: () => ipcRenderer.invoke('get-file-paths'),
    renameFiles: (files, pattern) => ipcRenderer.invoke('rename-files', files, pattern),
    saveRule: (ruleName, ruleData) => ipcRenderer.invoke('save-rule', ruleName, ruleData),
    getSavedRules: () => ipcRenderer.invoke('get-saved-rules'),
    loadRule: (ruleName) => ipcRenderer.invoke('load-rule', ruleName),
    deleteRule: (ruleName) => ipcRenderer.invoke('delete-rule', ruleName),
    checkForUpdates: () => ipcRenderer.sendSync('check-for-updates'),
    getAppVersion: () => ipcRenderer.invoke('get-app-version'),
    onUpdateStatus: (callback) => ipcRenderer.on('update-status', (_, text) => callback(text)),
    onUpdateVersions: (callback) => ipcRenderer.on('update-versions', (_, data) => callback(data)),
    onUpdateAvailable: (callback) => ipcRenderer.on('update-available', (_, data) => callback(data)),
    getSystemInfo: () => ipcRenderer.invoke('get-system-info')
  }
);

// 이미지 크기를 가져오는 기능 추가
contextBridge.exposeInMainWorld('electron', {
  getImageSize: (filePath) => ipcRenderer.invoke('get-image-size', filePath),
  getVideoMetadata: (filePath) => ipcRenderer.invoke('get-video-metadata', filePath)
}); 