'use strict'

import { app, BrowserWindow, ipcMain, shell } from 'electron'
import path from 'path'

// import store from "../renderer/store"

// 自动更新模块
import { autoUpdater } from 'electron-updater'

// 更新包的位置
const feedUrl = `http://www.xuebabiji.club/exe/xbbj`

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow, webContents
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

app.commandLine.appendSwitch('ppapi-flash-path', process.env.NODE_ENV === 'development' ? app.getPath('pepperFlashSystemPlugin') : (process.arch === 'x64' ? `${__dirname}/../../../pepflashplayer64_28_0_0_126.dll` : ''))

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    title: '学霸笔迹',
    useContentSize: true,
    frame: false,
    width: 300,
    height: 440,
    resizable: false,
    webPreferences: {plugins: true, allowDisplayingInsecureContent: true, allowRunningInsecureContent: true},
    center: true
  })

  mainWindow.loadURL(winURL)

  webContents = mainWindow.webContents

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
      title: '学霸笔迹',
      parent: mainWindow,
      modal: true,
      show: false,
      frame: false,
      width: 1120,
      height: 480,
      resizable: false,
      webPreferences: {plugins: true, allowDisplayingInsecureContent: true, allowRunningInsecureContent: true}
    })
    child.loadURL(arg)
    child.once('ready-to-show', () => {
      child.show()
    })
  })
}

// 主进程主动发送消息给渲染进程函数
function sendUpdateMessage (message, data) {
  setTimeout(function () {
    webContents.send('message', { message, data })
  }, 1000)
}

let checkForUpdates = () => {
  // 设置当前版本
  autoUpdater.currentVersion = '0.0.1'
  autoUpdater.updateConfigPath = './resources/app-update.yml'

  // 配置安装包远端服务器
  autoUpdater.setFeedURL(feedUrl)

  // 下面是自动更新的整个生命周期所发生的事件
  autoUpdater.on('error', function (message) {
    sendUpdateMessage('error', message)
  })

  autoUpdater.on('checking-for-update', function (message) {
    sendUpdateMessage('checking-for-update', message)
  })

  autoUpdater.on('update-available', function (message) {
    sendUpdateMessage('update-available', message)
  })

  autoUpdater.on('update-not-available', function (message) {
    sendUpdateMessage('update-not-available', message)
  })

  // 更新下载进度事件
  autoUpdater.on('download-progress', function (progressObj) {
    sendUpdateMessage('downloadProgress', progressObj)
  })

  // 更新下载完成事件
  autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
    sendUpdateMessage('is-update-now')
    ipcMain.on('update-now', (e, arg) => {
      autoUpdater.quitAndInstall()
    })
  })

  // 执行自动更新检查
  autoUpdater.checkForUpdates()
}

if (process.env.NODE_ENV !== 'development') {
  checkForUpdates()
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
