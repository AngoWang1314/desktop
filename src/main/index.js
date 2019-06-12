'use strict'

import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { autoUpdater } from 'electron-updater'
import path from 'path'
// import store from "../renderer/store"

// 更新包的位置
const feedUrl = `http://www.xuebabiji.club/${process.platform}/xbbj/${process.arch}`

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow, webContents
const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080` : `file://${__dirname}/index.html`

// 加载flash的dll
app.commandLine.appendSwitch('ppapi-flash-path', process.env.NODE_ENV === 'development' ? app.getPath('pepperFlashSystemPlugin') : (process.arch === 'x64' ? `${__dirname}/../../../pepflashplayer64_28_0_0_126.dll` : `${__dirname}/../../../pepflashplayer32_32_0_0_192.dll`))

function createWindow () {
  // 新建窗口
  mainWindow = new BrowserWindow({
    title: '学霸笔迹',
    useContentSize: true,
    frame: false,
    width: 300,
    height: 440,
    resizable: true,
    webPreferences: {plugins: true, allowDisplayingInsecureContent: true, allowRunningInsecureContent: true},
    center: true
  })

  // 加载网页
  mainWindow.loadURL(winURL)

  // 网页指针
  webContents = mainWindow.webContents

  mainWindow.on('maximize', () => {
    mainWindow.is_fullscreen = true
    webContents.send('toggle-window')
  })

  mainWindow.on('unmaximize', () => {
    mainWindow.is_fullscreen = false
    webContents.send('toggle-window')
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

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
    mainWindow.setSize(1390, 750)
    mainWindow.center()
    event.sender.send('finish-login')
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

  ipcMain.on('open-office', (event, arg) => {
    shell.openItem(path.join(__dirname, 'new.ppt'))
  })

  ipcMain.on('logout', (event, arg) => {
    mainWindow.setSize(300, 440)
    mainWindow.center()
  })
}

// 主进程主动发送消息给渲染进程
function sendUpdateMessage (message, data) {
  setTimeout(function () {
    webContents.send('message', { message, data })
  }, 1000)
}

let checkForUpdates = () => {
  // 配置远端的服务器
  autoUpdater.setFeedURL(feedUrl)

  // 设版本和更新索引
  autoUpdater.updateConfigPath = './resources/app-update.yml'
  autoUpdater.currentVersion = '0.0.1'

  // 更新出错触发事件
  autoUpdater.on('error', function (message) {
    sendUpdateMessage('error', message)
  })

  // 检查是否已有更新
  autoUpdater.on('checking-for-update', function (message) {
    sendUpdateMessage('checking-for-update', message)
  })

  // 更新可用触发事件
  autoUpdater.on('update-available', function (message) {
    sendUpdateMessage('update-available', message)
  })

  // 更新不可用的事件
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

app.on('ready', () => {
  if (process.env.NODE_ENV !== 'development') {
    checkForUpdates()
  }

  createWindow()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
