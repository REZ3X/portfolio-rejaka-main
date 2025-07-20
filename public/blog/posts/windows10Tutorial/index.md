## Windows 10.. a bit old isn't it?

**Still rocking Windows 10 while everyone's jumping to Windows 11?**

You're not alone, friend! 😊

It's true—this OS is getting older, and yeah, Microsoft's pulling the plug on support this October. But here's the thing: it's not really about the age of the operating system. There are tons of people who choose to stick with Windows 10 because, honestly? Some programs just work better on Win 10 than Win 11.

Maybe you prefer Windows 10 because it's lighter, more familiar, or you've got that one crucial software that throws a tantrum on Win 11. Whatever your reason, you need it—but do you actually know how to get it or install it properly?

Don't worry.. I've got your back! I'm here to walk you through the whole process step by step. So grab a coffee, get comfortable, and let's make this happen! ☕

## ⚠️ Quick Heads Up!

> In this tutorial, I'll be using a VM inside VirtualBox for the demo, so the initial setup will look different from installing on a real device. That's why I'm giving you two different approaches—pick the one that fits your situation!

## Let's Get Started - First Setup

### Installing on Your Actual Computer/Laptop

**What you'll need:**
1. **Your target device**: Computer/Laptop with at least 8GB RAM and 512GB storage (SSD is way better, trust me!)
2. **Rufus software**: The magic tool that makes bootable USBs
3. **Windows 10 ISO file**: The actual Windows installer
4. **Empty USB drive**: At least 8GB (and yeah, everything on it will be wiped!)
5. **Another computer**: To create the bootable USB if your main one is the target

#### Creating Your Bootable USB (The Fun Part!)

**Here's how we make the magic happen:**

1. **Get Rufus Ready**
   - Head over to [rufus.ie](https://rufus.ie) and download it
   - No installation needed—just run it directly!

2. **Prep Your USB Drive**
   - Plug in that USB drive
   - **Warning time**: Everything on this USB is about to disappear forever, so back up anything important!

3. **Configure Rufus Like a Pro**
   - Fire up Rufus as Administrator (right-click → "Run as administrator")
   - **Device**: Pick your USB from the dropdown
   - **Boot selection**: Click "SELECT" and find your Windows 10 ISO
   - **Image option**: Keep it as "Standard Windows installation"
   - **Partition scheme**: Go with "GPT" (modern systems love this)
   - **Target system**: Choose "UEFI (non CSM)"
   - **File system**: NTFS is your friend here

4. **Let the Magic Happen**
   - Hit "START" and confirm you're okay with nuking the USB
   - Grab a snack—this usually takes 5-15 minutes
   - Safely eject when it's done!

#### BIOS Setup (Don't Panic, It's Easier Than It Sounds!)

**Time to tell your computer to boot from USB:**

1. **Getting Into BIOS**
   - Restart your computer
   - Spam that BIOS key during startup (usually F2, F12, Delete, or Esc)
   - Pro tip: Watch for boot messages—they usually tell you which key to press!

2. **Tweak Those Settings**
   - Find the "Boot" section
   - **Disable Secure Boot**: Security → Secure Boot Control → Disabled
   - **Enable USB Boot**: Make sure USB devices can boot
   - **Set Boot Priority**: Move USB to the top of the list
   - Or just use the Boot Menu (F11/F12) when starting up

3. **Save and Pray**
   - Hit F10 or find "Save & Exit"
   - Confirm your changes and restart
   - Your computer should now boot from that USB!

### VirtualBox VM (For the Cautious Souls)

**What you'll need:**
1. **Host computer**: 8GB RAM, 512GB storage, decent CPU
2. **VirtualBox**: Download from [virtualbox.org](https://www.virtualbox.org)
3. **Windows 10 ISO**: Same file as above

#### Setting Up Your Virtual Machine

**Creating your virtual playground:**

1. **Make a New VM**
   - Open VirtualBox, click "New"
   - **Name**: "Windows 10" (or whatever makes you happy)
   - **Type**: Microsoft Windows
   - **Version**: Windows 10 (64-bit)

2. **Give It Some Juice**
   - **CPU**: 2 cores minimum, 4 is sweet
   - **RAM**: 4GB minimum, 6-8GB if you can spare it
   - **Storage**: 50GB minimum, 80GB+ recommended
   - **Network**: NAT or Bridged for internet access

3. **Mount That ISO**
   - VM Settings → Storage
   - Click the CD icon, select your ISO
   - Make sure it's the primary boot device

## The Main Event - Windows 10 Installation

**Ready? Here we go!**

### Starting Strong

![First Load Boot](./1windowsBoot.png "That familiar Windows loading screen")

After that first boot screen loads up, you'll see the Language, Time & Currency, and Keyboard setup. Pick whatever feels right for your region—no wrong answers here!

![Language Setup](./2languageTimeKeyboardSet.png "Choose your language and region")

### Let's Install This Thing!

Click "Next" and you'll see the install screen. Hit that "Install Now" button and let's get this party started!

![Install Screen](./3installNow.png "The moment of truth - Install Now!")
![Setup Starting](./4setupStarting.png "Windows is waking up")

### Product Key? We Don't Need No Stinking Product Key!

When the activation window pops up, just choose "I don't have a product key." We'll deal with activation later (and yes, for free!).

![Activation Screen](./5activateWindows.png "Skip this for now")

### Picking Your Windows Flavor

At the OS selection screen, go with **Windows 10 Pro**—it's got all the good stuff. Click "Next" and accept those license terms (we all know you're not reading them anyway 😉).

![OS Selection](./6windowsType.png "Pro is the way to go")
![License Terms](./7licenseTerms.png "The fine print nobody reads")

### Storage Time (This is Where It Gets Interesting)

For storage setup, I'm going with the manual approach. You could just click that first partition and call it a day, but where's the fun in that? Let's make some custom partitions!

![Partition Settings](./8partition.png "Time to get organized")
![Adding Partitions](./9addingPartition.png "Creating our custom layout")
![Partition Done](./10afterPartition.png "Looking good!")

### The Waiting Game

Click "Next" and now we wait. This is a good time to grab that coffee refill or scroll through your phone—Windows is doing its thing!

![Installation Progress](./11installationScreen.png "Windows is hard at work")
![Still Installing](./12installationScreen.png "Patience, young grasshopper")

### Restart and Keep Going

When installation finishes, your computer will restart on its own. Don't touch anything—just let it do its thing!

![Restart Time](./13waitingRestart.png "Off we go again")
![Getting Ready](./14gettingReady.png "Almost there...")

### Initial Setup (The Home Stretch!)

After the restart, you'll get setup screens for your region and keyboard layout. Pick what works for you!

![Region Choice](./15chooseRegion.png "Where in the world are you?")
![Keyboard Layout](./16keyboardLayout.png "How do you type?")

Skip the additional keyboard layouts unless you really need them, and let the setup continue loading.

![Additional Keyboards](./17additionalKeyLayout.png "Skip this if you want")
![Setup Loading](./18setupLoading.png "Almost ready...")

### Updates Can Wait

When Windows asks about updates, feel free to skip this for now. We want to get you up and running first!

![Windows Updates](./19latestWinUpdate.png "Updates can wait")

### Personal Use It Is!

Choose "Set up for personal use" unless you're doing this for work.

![Personal Setup](./20personalSetup.png "Just for you")

### The Great Microsoft Account Bypass

**Here's a neat trick**: If you don't want to sign into a Microsoft account right away, we can totally bypass this! Just enter a fake email and any password.

![Email Bypass](./21accountBypass.png "Fake email works fine")
![Password Bypass](./22accountBypass.png "Any password will do")

You'll get an error screen, but that's exactly what we want—it gives us a "Skip" option!

![Bypass Success](./23accountBypass.png "Perfect! Now we can skip")

### Create Your Local Account

Now create your local Windows username and password. Pick something you'll remember!

![User Account](./24PCuser.png "What should we call you?")
![User Password](./25PCuser.png "Pick a good password")

### The Dreaded Security Questions

Since we bypassed the Microsoft account, we need to set up three security questions. Yeah, I know—they're annoying, but they're important for password recovery.

![Security Questions](./26SecQuestion.png "Necessary evil, I'm afraid")

### Privacy Settings

Configure these however you want, or just accept the defaults and tweak them later.

![Privacy Settings](./27privacySetting.png "Your privacy, your choice")

### The Final Countdown

Wait for the last bit of setup to finish, and then...

![Final Setup](./28waitScreen.png "So close now...")
![Success!](./29win10Installed.png "We did it!")

**Boom! Windows 10 is installed and ready to rock!** 🎉

## License Activation (The Free Way!)

### Getting Windows Activated

Your Windows works, but want to unlock everything? Of course you do! And guess what? We're doing this completely free.

**Here's the secret sauce:**

1. **Open Edge** and go to [massgrave.dev](https://massgrave.dev)
2. **Follow their guide**—these folks know what they're doing!

![MAS Website](./30massgraveWebsite.png "Your new best friend")

3. **Fire up PowerShell** as Administrator and run:
   ```powershell
   irm https://get.activated.win | iex
   ```

![PowerShell Time](./31openWinPoershell.png "Admin PowerShell is key")
![Activation Command](./32getwin.png "Here we go!")

4. **Hit a TLS error?** Don't sweat it—just run this first:
   ```powershell
   [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
   irm https://get.activated.win | iex
   ```

![TLS Error](./33errorTLS.png "Sometimes this happens")
![Fixed!](./34solutionTLSerrorandrerun.png "Much better")

5. **Choose option 1 (HWID)** for Windows activation

![Activation Script](./35winActivateScript.png "Pick option 1")
![Windows Activated](./36windowActivated.png "Success!")

### Office Activation (Because We're Greedy Like That)

Microsoft Office is pretty essential for most people, right? Let's get that activated too!

1. **Back in the activation script**, choose option 2 (Ohook)

![Back to Menu](./37winActivateScript.png "Round two!")

2. **Select option 1** in the Office section

![Office Options](./38officeActivation.png "Let's do this")

3. **No Office installed yet?** No problem—the script will help you install it first!

![Office Missing](./39officeAppNotFound.png "We need to install Office first")

4. **Download Office** from the link it provides—look for the C2R Installer in your language

![Office Download](./40massgraveOfficeDownload.png "Choose your language")
![Indonesian Version](./41indonesianVersion.png "Bahasa Indonesia anyone?")

5. **Run the installer**—accept those security warnings

![SmartScreen](./42smartScreenRunOffice.png "Click Run")
![Account Control](./43accountControlOffice.png "Yes, we trust this")

6. **Wait patiently** for Office to install

![Installing Office](./44waitForInstallation.png "Coffee break time")
![Office Installed](./45officeInstallationDone.png "Office is ready!")

7. **Now activate Office** using the script (option 1 again)

![Activate Office](./46activateOfficeLicense.png "Final step")
![Office Activated](./47officeLicenseActivated.png "Everything's activated!")

### Double-Check Your Work

Both Windows and Office should now be fully activated! Check Windows Settings and open any Office app to confirm.

![License Check](./48licenseChecking.png "Looking good!")

## Bonus Round: Autodesk EAGLE

**Want to design some PCBs? Let's install EAGLE!**

### Update Edge First

Since I've got the EAGLE installer on Google Drive and the default Edge might be too old:

1. **Download the latest Edge** from [Microsoft's site](https://www.microsoft.com/en-us/edge/business/download)

![Edge Download](./49updateEdge.png "Get the latest Edge")
![Edge Installer](./50updateEdge.png "Download in progress")

2. **Install it**—you know the drill with security warnings

![Edge SmartScreen](./51updateEdgeSmartScreen.png "Run it anyway")
![Edge Permissions](./52edgeAccountControl.png "Yes, please")

3. **Wait for it to finish**

![Edge Installing](./53downloadWaiting.png "Almost there")
![Edge Updated](./54edgeUpdated.png "Fresh new Edge!")

### Installing EAGLE

1. **Grab the installer** from my [Google Drive folder](https://drive.google.com/drive/folders/1-B_8SIAIRyWiv-xwQhL1SgjoSdvYtqef?usp=sharing)

![EAGLE Drive](./55autodeskEagleDriveDownload.png "Download from here")
![Downloading EAGLE](./56autodeskEagleDownloadDrive.png "Getting EAGLE")
![Download Complete](./57autodeskEagleDownloadDrive.png "Got it!")

2. **Run the installer** from your Downloads folder

![EAGLE Installer](./58installEagleInstaller.png "Time to install")
![EAGLE SmartScreen](./59eagleSmartScreen.png "Run it")
![EAGLE Permissions](./60eagleAccountControl.png "Allow it")

3. **Follow the wizard**—just accept the defaults for everything

![EAGLE Wizard](./61eagleWizard.png "Installation wizard")
![License Agreement](./62eagleWizard.png "Accept the terms")
![Installation Path](./63eagleWizard.png "Default path is fine")
![Components](./64eagleWizard.png "Install everything")
![Start Menu](./65eagleWizard.png "Add shortcuts")
![Installing](./66eagleWizard.png "Installing components")

4. **Create an Autodesk account** when EAGLE launches

![EAGLE Launch](./67eagleOpen.png "EAGLE is starting up")
![Account Login](./68eagleAccount.png "Need an account")
![Create Account](./69eagleCreateAccount.png "Sign up here")

5. **Don't forget to verify your email!**

![Email Verification](./70accountVerif.png "Check your inbox")

### Troubleshooting EAGLE (Just in Case)

**EAGLE crashing right after the splash screen?** Don't panic! This is a known issue.

**The fix**: Navigate to EAGLE's installation folder, find `libeay32.dll`, and rename it to `libeay32.dll.bak`. Then try launching EAGLE again.

For more details, check out [Autodesk's official solution](https://www.autodesk.com/support/technical/article/caas/sfdcarticles/sfdcarticles/Eagle-crashes-seconds-after-launching-splash-screen.html).

**Success!** Your EAGLE is ready for some serious PCB design!

![EAGLE Working](./71eagleOpened.png "EAGLE is ready to go!")

## We Did It! 🎉

**Look at what we accomplished together:**

- ✅ **Fully functional Windows 10** with all features unlocked
- ✅ **Complete Microsoft Office suite** ready for productivity
- ✅ **Autodesk EAGLE** for all your electronics projects
- ✅ **Everything activated and legal** (thanks to some awesome tools)

Sure, Windows 10 support ends this October, but you now have a rock-solid system that many people still prefer. Whether it's for compatibility, familiarity, or just personal preference—you're all set!

**Thanks for following along on this journey!** If you got stuck anywhere or have questions, drop them in the comments below. I love helping fellow tech enthusiasts get their systems running perfectly.

Now go build something awesome! 🚀