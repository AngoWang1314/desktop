'use strict'

import { app, BrowserWindow, ipcMain, shell } from 'electron'
import path from 'path'

// import store from "../renderer/store"

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

app.commandLine.appendSwitch('ppapi-flash-path', app.getPath('pepperFlashSystemPlugin'))

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    useContentSize: true,
    frame: false,
    width: 300,
    height: 440,
    resizable: false,
    webPreferences: {plugins: true},
    center: true
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  /* setInterval(() => {
    store.dispatch('Counter/increase')
  }, 3000) */

  ipcMain.on('min-window', (event, arg) => {
    mainWindow.minimize()
    event.sender.send('min-window')
  })

  ipcMain.on('toggle-window', (event, arg) => {
    if (mainWindow.is_fullscreen) {
      mainWindow.unmaximize()
    } else {
      mainWindow.maximize()
    }
    mainWindow.is_fullscreen = !mainWindow.is_fullscreen
    event.sender.send('toggle-window')
  })

  ipcMain.on('close-window', (event, arg) => {
    mainWindow.destroy()
  })

  ipcMain.on('finish-login', (event, arg) => {
    // mainWindow.setResizable(true)
    mainWindow.setSize(1390, 750)
    mainWindow.center()
    event.sender.send('finish-login')
  })

  ipcMain.on('open-office', (event, arg) => {
    shell.openItem(path.join(__dirname, 'new.ppt'))
  })

  ipcMain.on('logout', (event, arg) => {
    mainWindow.setResizable(true)
    mainWindow.setSize(300, 440)
    mainWindow.setResizable(false)
    mainWindow.center()
  })

  ipcMain.on('open-window', (event, arg) => {
    let child = new BrowserWindow({
      parent: mainWindow,
      modal: true,
      show: false,
      frame: false,
      width: 1120,
      height: 480,
      resizable: false,
      webPreferences: {plugins: true}
    })
    child.loadURL(arg)
    child.once('ready-to-show', () => {
      child.show()
    })
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
*/
