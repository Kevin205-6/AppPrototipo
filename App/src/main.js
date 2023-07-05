import { app, BrowserWindow } from "electron";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1500,
    height: 800,
  });

<<<<<<<< HEAD:App/src/main.js
  win.loadURL("http://192.168.1.70:5173/");
========
  win.loadURL("http://localhost:5173/");
>>>>>>>> 67d1639cb3d632f882f346d3e94c3a341dcf481d:main.js
};

try {
  app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });
} catch (error) {
  console.log(error.message);
}
