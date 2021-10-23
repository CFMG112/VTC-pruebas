import { BrowserWindow, screen } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { Logger } from '@nestjs/common';
import { ipcMain, Menu, MenuItemConstructorOptions } from 'electron';

export class AppModule {
  static mainWindow: Electron.BrowserWindow;
  static application: Electron.App;
  static BrowserWindow;

  static init(app: Electron.App, browserWindow: typeof BrowserWindow) {
    Logger.log("init", "AppModule");

    AppModule.BrowserWindow = browserWindow;
    AppModule.application = app;
    AppModule.application.allowRendererProcessReuse = true;
    AppModule.application.on('window-all-closed', AppModule.onWindowAllClosed);
    AppModule.application.on('activate', AppModule.onActivate);
    AppModule.application.on('ready', AppModule.onReady);
    
    ipcMain.handle("/refresh", () => {
      AppModule.application.relaunch();
      AppModule.application.exit();
    })

  }

  private static onReady() {
    AppModule.onCreateWindow();
  }

  private static onCreateWindow() {
    const size = screen.getPrimaryDisplay().workAreaSize;
    const args = process.argv.slice(1);
    const serve = args.some(val => val === '--serve');

    AppModule.mainWindow = new AppModule.BrowserWindow({
      title: "VCM Sentry",
      x: 0,
      y: 0,
      width: 1024,
      height: 768,
      minWidth: 800,
      minHeight: 600,
      backgroundColor: "#ffffff",
      titleBarStyle: 'hidden',
      //trafficLightPosition: {x: 12, y: 42},
      transparent: true, 
      frame: true,
      webPreferences: {
        nodeIntegration: true,
        allowRunningInsecureContent: false,
      },
    });

    
    

    if (serve) {
      AppModule.mainWindow.loadURL('http://localhost:4200');
      AppModule.mainWindow.webContents.openDevTools();
    } else {
      AppModule.mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../dist-app/index.html'),
        protocol: 'file:',
        slashes: true,
        path: path.join(__dirname, '../dist-app/')
      }));
    }

    AppModule.onCreateMenu();
    AppModule.mainWindow.on('closed', AppModule.onClose);
  }

  private static onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      AppModule.application.quit();
      AppModule.mainWindow = null;
    }
  }

  private static onCreateMenu(){

    const isMac = process.platform === 'darwin'
    const args = process.argv.slice(1);
    const isServe = args.some(val => val === '--serve');
    let template: MenuItemConstructorOptions[];
    
    if(isMac){
      template = [{
          label: AppModule.application.name,
          submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
          ]
        },
        {
          label: 'File',
          submenu: [
            { role: 'close' }
          ]
        },
        
        {
          label: 'Edit',
          submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            { role: 'pasteAndMatchStyle' },
            { role: 'delete' },
            { role: 'selectAll' },
            { type: 'separator' },
          ]
        },
        {
          label: 'View',
          submenu: [
            { role: 'togglefullscreen' }
          ]
        },
      ]
    }else{
      template = [
        {
          label: 'File',
          submenu: [
            { role: 'quit' }
          ]
        },
        {
          label: 'Edit',
          submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            { role: 'delete' },
            { type: 'separator' },
            { role: 'selectAll' }
          ]
        },
        
        {
          label: 'View',
          submenu: [
            { role: 'togglefullscreen' }
          ]
        },
      ]
    };

    if(isServe){
      template.push({
        label: 'Development',
        submenu: [
          { role: 'toggleDevTools' },
          { role: 'togglefullscreen' }
        ]
      },)
    }

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }

  private static onClose() {
    AppModule.mainWindow = null;
  }

  private static onActivate() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (AppModule.mainWindow === null) {
      AppModule.onCreateWindow();
    }
  }
}