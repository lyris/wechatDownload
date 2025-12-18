// Shim for @electron-toolkit/utils to avoid initialization issues
import { app } from 'electron';

export const is = {
  get dev() {
    return !app.isPackaged;
  }
};

export const platform = {
  isWindows: process.platform === 'win32',
  isMacOS: process.platform === 'darwin',
  isLinux: process.platform === 'linux'
};

export const electronApp = {
  setAppUserModelId(id: string) {
    if (platform.isWindows) {
      app.setAppUserModelId(is.dev ? process.execPath : id);
    }
  }
};

export const optimizer = {
  watchWindowShortcuts(window: Electron.BrowserWindow) {
    // Simplified implementation - just handle F12 for dev tools
    window.webContents.on('before-input-event', (_event, input) => {
      if (input.key === 'F12') {
        if (window.webContents.isDevToolsOpened()) {
          window.webContents.closeDevTools();
        } else {
          window.webContents.openDevTools();
        }
      }
    });
  }
};
