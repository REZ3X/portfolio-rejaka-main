# 🚀 Manage Go Versions Like a Pro with GVM on Linux

Hey fellow gopher 🐹!  
Managing multiple Go (Golang) versions can be a pain, right? You don’t want to uninstall and reinstall Go every time just to switch versions, that’s crazy! 😅

Well, worry no more because here comes the **Go Version Manager (GVM)**. With GVM, you can easily install, switch, and manage different Go versions just like a boss. No more conflicts, no more headaches. 🎉

Let’s dive in!

---

## 🧰 Requirements

Before we get started, make sure your Linux system has the tools needed:

```bash
sudo apt-get update
sudo apt-get install curl git mercurial make binutils bison gcc
```

👉 Using Fedora or CentOS? Swap `apt-get` with `dnf` or `yum`.

---

## ⚙️ Install GVM

Time to bring GVM into your system. Run this magic command:

```bash
bash < <(curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer)
```

Boom! That’s it GVM is installed. 🎊

---

## 🔗 Load GVM into Your Shell

Hold up! You need to tell your shell about GVM.

For **bash**, add this line into your `~/.bashrc`:

```bash
[[ -s "$HOME/.gvm/scripts/gvm" ]] && source "$HOME/.gvm/scripts/gvm"
```

For **zsh** users → put it in your `~/.zshrc`.

Then reload your shell:

```bash
source ~/.bashrc
```

Done! ✅

---

## 📥 Install a Go Version

Now let’s get some Go! Example:

```bash
gvm install go1.21.6
```

Make it your default:

```bash
gvm use go1.21.6 --default
```

Super easy, right?

---

## 🧐 Verify Installation

Check which Go version you’re rocking:

```bash
go version
```

If it shows your installed version → 🎉 congrats, you’re good to go!

---

## 🧹 Optional: Remove System Go

If you already installed Go using system packages (`apt`, `dnf`, `yum`), better remove it to avoid conflicts:

```bash
sudo apt-get remove golang
```

(or `dnf remove golang` / `yum remove golang`).

---

## 🎁 Bonus GVM Commands

Some handy extras:

```bash
gvm list                 # show installed Go versions
gvm listall              # list all available Go versions online
gvm install <version>    # install a specific version
gvm use <version>        # switch version
gvm uninstall <version>  # remove a version
```

---

## 🎉 That’s It Folks!

And that’s all for installing and using **GVM on Linux**. Easy, right? Now you can manage multiple Go versions without stress. 🚀  

Go build something awesome with Go! 🐹💻  