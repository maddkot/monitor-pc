const { BrowserWindow, app } = require('electron');
const path = require('path');


function createWindow() {
    const win = new BrowserWindow({
        width: 600,
        height: 430,
        minWidth: 600,
        minHeight: 430,
        icon: __dirname + '/icon.ico',
        webPreferences: {
            nodeIntegration: false,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
            devTools: false
        }
    })
    win.setMenu(null);
    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    })
})
    .catch((err) => { throw new Error(`Ошибка: ${err}`) })

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
     }
})

