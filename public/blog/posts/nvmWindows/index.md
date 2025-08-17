# Mighty Tool for JS Developer

Hey you fellow JS developer! As you already knew, we often deal with multiple projects built using different versions of Node.js. It’s frustrating, right? You wouldn’t want to install each version manually, of course not! That’d be nuts. So here’s the ultimate solution.. Node Version Manager (NVM)!

What? You don’t know what that is?? Well simply, it’s a tool that lets you install, manage, and switch between different versions of Node.js easily. Instead of being stuck with one global version, NVM allows you to quickly switch versions depending on your project.

Cool right? So fellow JS developer in Windows... let me help you!

> This tutorial is for Windows only. But if you're a Linux user, I already made a guide for Debian below:

[Node Version Manager (NVM) Tutorial Linux](https://rejaka.id/blog/nvmTutorial).

---

## 🧰 Requirements

1. Laptop/PC with Windows OS (10/11) - I use Windows 10, but it works the same on 11
2. Internet Connection
3. Web browser

---

## 🧑‍💻 NVM Installation

### 🔽 NVM Setup Download

1. Download from Corey Butler’s repository [here](https://github.com/coreybutler/nvm-windows).
2. Scroll to the bottom, find “Install Now” or go directly to the [Releases](https://github.com/coreybutler/nvm-windows/releases).
3. Download the latest `nvm-setup.exe`.

![Download NVM Setup](./nvmsetup.png "Download NVM Setup")

### 💾 NVM Installation

1. Run the installer from File Explorer > Downloads.

![File Explorer](./dooubleclick.png "File Explorer")
![Smart Screen](./smartscreen.png "Smart Screen")
![Account Control](./accountcontrol.png "Account Control")

2. Accept the agreement and click “Next”.

![Agreement](./agreement.png "Agreement")

3. Use the default installation paths.

![NVM Installation Folder](./nvminstallfolder.png "NVM Installation Folder")
![Active Version](./activeversion.png "Active Version")

4. For notification settings, stick with the default.

![Notification Setting](./notification.png "Notification Setting")

5. Wait for installation.
6. Finish (don’t tick “Open with PowerShell”).

![Finish](./finish.png "Finish")

7. Validate by running this command in Command Prompt:

```bash
nvm -v
```

![nvm -v](./nvmv.png "nvm -v")

Boom! NVM is ready!

---

## 🧱 Node.js Installation

Let’s get to the real action.

### 🔧 Install Node.js

```bash
nvm install <node-version>
```

Example:

```bash
nvm install 22.15.0
```

Or for latest LTS:

```bash
nvm install lts
```

![nvm install](./nvminstall.png "nvm install")

### 🚀 Use Installed Node Version

```bash
nvm use 22.15.0
```

Oops! What’s this error??

![nvm use error](./nvmerror.png "nvm use error")

It’s because of spaces in the username path I use e.g., `Windows User`.

---

> If you don't have the same problem you could skip the next part and go for the "Reactivate Node.js"

## 🧩 Fix NVM Node.js Activation Error

1. Move the `nvm` folder from your earlier default nvm installation path:
   ```bash
   C:\Users\<space username>\AppData\Local\nvm
   ```
   to:
   ```bash
   C:\nvm
   ```

If you forgot where the nvm installation take place, type this command in command prompt:

```bash
nvm root
```

![NVM Root Path](./nvmrootpath.png "NVM Root Path")

_If AppData is hidden, enable "Hidden items" from View tab._

![NVM Moved](./nvmmoved.png "NVM Moved")

2. Edit `C:\nvm\settings.txt`:

```txt
root: C:\nvm
```

![settings.txt](./settings.png "settings.txt")

3. Open Environment Variables, update all `nvm`-related paths to `C:\nvm`.

![Environment Variable](./envvar.png "Environment Variable")
![Environment Path Change](./env1.png "Environment Path Change")
![Environment Path Change](./env2.png "Environment Path Change")

Click OK to save.

---

## 🔄 Reactivate Node.js

```bash
nvm use 22.15.0
```

![nvm use rerun](./nvmuse1.png)
![nvm use rerun](./nvmuse2.png)
![nvm use rerun](./nvmuse3.png)

Then check Node.js:

```bash
node -v
```

![Node Checking](./nodecheck.png "Node Checking")

All good! 🎉 Node.js is ready to go.

---

## 🎁 Bonus NVM Commands

```bash
nvm ls                      # list installed Node versions
nvm list available          # show available versions online
nvm use <node-version>      # switch version
nvm alias default <version> # set default version
nvm uninstall <version>     # remove a version
```

---

## 🎉 That’s It Folks!

That’s all from me for this NVM Windows tutorial. Easy, right? Now go build your awesome apps with the right Node.js version like a pro!
