//ipcMain is used to communicate between the main process and the renderer process
// This file is part of the Electron application and handles IPC communication
const {app, browserWindow, ipcMain} = require('electron');
const path = require('path');

