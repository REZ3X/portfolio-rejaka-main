## Hello my fellow Coders! :3

Have either of you Coders planning to build, develop, or even deploying NodeJS based backend app using OS that based on Linux kernel? If yes, good news! I’m here to help you to start with the most easiest thing to do. But first let me ask you one thing, did you know what NodeJS is? It’s obvious, you’re gonna need to learn some basic. **NodeJS or simply called by Node is a runtime environment for your JavaScript language, it allows JavaScript code to run outside the browser and supports cross-platform execution on Linux, Windows, and even Mac.** Developing or deploying NodeJS based backend app means you need to have the NodeJS installed first, if not how supposed you gonna run the code right? That’s alright I’ll help you to install it, if you don’t have it yet on your Linux.

Disclaimer first, installing NodeJS in Linux it’s not like installing in Windows. You can’t install the Node like install it per version like you could do in Linux. You must install something that called NVM then you can install the NodeJS. So, what is NVM? **NVM stands for Node Version Manager, it’s a tool that run in command-line interface that allow you Coders to install any version available of NodeJS and switch between version easily.** It is very useful for Coders that have many projects with different Node version, they can easily install and switch so there won’t be any compatibilty issue. So, before you install NodeJS you must install the NVM first and how we do it? Let me help you on that.

**Required package to install NVM:**

1. Curl
2. Git
3. Wget

If you don’t have any of those package it’s fine, I’ll help you with that.

## Guide for NVM installation:

Required Package:

Make sure your Advanced Packaging Tool Is Up To Date

```bash
sudo apt update && sudo apt upgrade

```

Install the Curl Git Wget

```bash
sudo apt install curl git wget

```

Now you have the required package, let’s hop to the next step.

**Installing NVM:**

First, you need to choose which version of NVM you want to install. You can eventually check the releases even the source code at GitHub. For the list of releases regarding the NVM for Linux with the source code <a href="https://github.com/nvm-sh/nvm/releases" target="_blank" rel="noopener noreferrer nofollow">check here</a>.

For me personal I prefer the latest, so for this time let just stick with the that. Assume the latest is 0.40.1.

Let’s install the NVM version 0.40.1 from GitHub using Curl.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

```

Load NVM into your shell session

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

Reload your shell configuration

```bash
source ~/.bashrc

```

After this your NVM should be installed, you can check it:

```bash
nvm --version

```

If the command give you the output of the version 0.40.1 it means it successfully installed.

## Installing NodeJS

Now for the main part, the guide to install the NodeJS:

First, look for all of the available NodeJS version to install by command:

```bash
nvm ls-remote

```

If you looking for only the Long-Term Support only you can add lts

```bash
nvm ls-remote --lts

```

If you find your desirable version of NodeJS you can install it by:

```bash
nvm install 20.9.0

```

If you want to install the latest version right away you can just:

```bash
nvm isntall node

```

Or you can just install the latest lts version:

```bash
nvm install --lts

```

Just with that your NodeJS is ready to use for your development and deployment of backend app.


But I want to share you some of **other command to use NVM** like:

Switch between version

```bash
nvm use 22.13.1

```

Switch to latest version installed

```bash
nvm use node

```

Set particular version as default

```bash
nvm alias default 20.9.0

```

Show the list of NodeJS version installed

```bash
nvm ls

```

Uninstall particular of version

```bash
nvm uninstall 20.9.0

```

If you want to know more you can use command:

```bash
nvm --help

```

Alright then, that’s all the step by step guide to install NVM and NodeJS on Linux. I hope this guide help you for your development. Until next post Coders!

This article written by Rejaka Abimanyu Susanto, a Full-Stack Developer that reside in Yogyakarta, Indonesia. If you want to know more about me you can visit me at <a href="https://rejaka.me" target="_blank">rejaka.me</a>.