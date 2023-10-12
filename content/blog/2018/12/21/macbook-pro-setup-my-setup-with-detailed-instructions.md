---
slug: macbook-pro-setup-my-setup-with-detailed-instructions
title: "MacBook Pro Setup: My setup with detailed instructions"
published: true
date: 2018-12-21T14:17:22-05:00
tags: ["mac","web development"]
excerpt: "MacBook Pro Setup: My setup with detailed instructions"
cover: ./tobias-lystad-606045-unsplash-1024x683.jpg
---

I thought I would take some time and document what I do when I get a new machine. This is going to walk through some preferences I configure, applications I install and settings I use for different programs. I am always curious to see how other software developers are setting up their development machines so I figured it would be a good opportunity to share mine.

I am a Software Developer so most of my configuration will be around programming. My current MacBook configuration is as follows:

*   MacBook Pro (13-inch, 2017, Two Thunderbolt 3 ports)
*   Processor: 2.3 GHz Intel Core i5
*   Memory: 16 GB
*   Startup Disk: Macintosh HD
*   Graphics: Intel Iris Plus Graphics 640 1536 MB
*   Storage: 500 GB

When you power on your MacBook you are going to run through the setup. I usually configure anything I can here like Wi-fi & Apple ID. The rest of the instructions will assume you made it through the setup and are on the desktop.

_If you don't want to have to wait for disk encryption (error in macOS updates section) don't select that during setup and perform that at a later time_

## macOS Updates

The first thing I do is run any updates that are available. In my case the laptop came preloaded with macOS Sierra and macOS Mojave has been released.

So my first step is going to be to update to macOS Mojave. You can download this and run this from the App Store.

_Error: You may not install to this volume because it is currently being encrypted_

If you get the error above than you chose the option of encrypting your hard drive during setup. Make sure you have the power plugged in and go to System Preferences > Security & Privacy > File Vault. From there you can see the progress of encryption and when its complete you can launch the macOS Mojave installer.

## App Store

If you have signed in with your Apple Id you will be taken directly to the Apple Store. This is a good time to run any updates that are available.

_You might run into issues here because the apple id that downloaded them is not you. In this case I just removed those apps I am not using (GarageBand,Numbers,Pages,iMovie…)_

To remove applications I like installing [AppCleaner](https://freemacsoft.net/appcleaner/). This will make sure that the application and any related files will be removed.

Another application I really love for this and so many other things is [Clean My Mac](https://macpaw.com/cleanmymac)

### Garage Band

Unfortunately AppCleaner only works for 3rd party installed applications and wont remove GarageBand. You need to remove this manually and while there are a few more locations these are the main 3 you should remove. If you're going to use apple sound affects in other programs please read up on this before deleting.

*   /Applications/GarageBand.app
*   /Library/Application Support/GarageBand/
*   /Library/Audio/Apple Loops/Apple/

Empty Trash

## Getting Started

Anything I can install using [HomeBrew](https://brew.sh/) I will. Before you install HomeBrew though you need to install the xcode command line utilities. Open up a new terminal and type the following command. Even if you plan on installing xcode I believe you still need to install these now as they moved them out of the standard installation.

```bash
xcode-select --install
```

The Command Line Tools Package is a small self-contained package available for download separately from Xcode and that allows you to do command line development in OS X. It consists of two components: OS X SDK and command-line tools such as Clang, which are installed in /usr/bin.

### HomeBrew

As I said earlier I use HomeBrew to install anything that it can install. I recently found out about cask which makes my life so much easier. If you normally use brew to install something like google-chrome you know that you have to then drag it into the applications folder. If you you use cask it will not only download the package but also move it into the applications folder.

[HomeBrew Website](https://brew.sh/)

Installation:  

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Post Installation

*   If you need help with brew you can run brew help.
*   brew update - You shouldn't have anything to update but its good to check.
*   brew search 'term' to search for brews

## Terminal / Bash / iTerm

Now that we have HomeBrew installed it's time to start installing some software. The default version of bash is v3.2 and I want to go ahead and upgrade this to 4.x. There is a [really good guide](http://clubmate.fi/upgrade-to-bash-4-in-mac-os-x/) here that you can follow to upgrade bash.

*   bash -v (bash-3.2)
*   brew install bash
*   if you close terminal or open a new tab it will show 4.4 but this still isn't the default version.
*   **which bash** will show you what bash you're using.

Now that we have bash updated we need to make that our default shell. To do so you need to edit /etc/shells

```bash
sudo vi /etc/shells
add the path /usr/local/bin/bash
comment out the others

Change to the new shell
chsh -s /usr/local/bin/bash 
```

### Bash Profile

Now that we have bash updated I need to customize my shell. Look in your home directory and see if you have a .bash\_profile and if you don't you can create one using the following command.

```bash
touch .bash_profile
```

This is where you can add all kinds of customization's to bash. I have included [my .bash\_profile](.bash_profile) in this repository if you want to check it out. As always if you have questions about what's in there please let me know.

### iTerm2

For the longest time I used the terminal and even had a couple of people call me out on it :joy:

I am now using iTerm2 full time and I absolutely love it. If you want to find out about some of the features & configurations it gives you please [check out their website](https://www.iterm2.com/features.html).

```bash
brew cask install iterm2
```

One thing I like to do is customize the colors and a great resource for that is https://iterm2colorschemes.com/

This is a list of my favorite color schemes.

*   Dracula
*   FirefoxDev
*   Github
*   Grape
*   Grass
*   Hipster Green
*   Homebrew
*   Man Page
*   Material
*   MaterialDark
*   Novel
*   OceanicMaterial

## Development Setup

Now that I have a nice looking command line full of features its time to start installing all of the different applications I will use. If you have any questions about any of these or why I install them please see the contact me section below.

*   brew install git
*   brew cask install google-chrome
*   brew cask install google-chrome-canary
*   brew cask install firefox
*   brew cask install firefox-developer-edition
*   brew cask install visual-studio-code
*   brew cask install visual-studio-code-insiders
*   brew cask install intellij-idea
*   brew cask install eclipse-java
*   brew cask install postman
*   brew cask install docker
*   brew cask install spectacle
*   brew install tree
*   https://github.com/sindresorhus/quick-look-plugins

### Visual Studio Code

If you aren't using Visual Studio Code, what the heck are you waiting for? All jokes aside I am sure you have probably heard of code by now and here is a few ways that I customize it.

#### Extensions

I used to hate having to install Visual Studio Code on a new machine. The reason for that is I have grown to love the editor so much that I have an extension for everything. I use to install them one by one and when you have to do that 35 times it gets really old.

If you want to get a list of extensions currently installed on your machine you can use the following command.

```bash
code --list-extensions
```

The nice thing about that is you can install visual studio code extensions using the command line.

```bash
code --install-extension ${extension-name}
```

You can pipe the results of your list into a file or if you wish you can grab mine from this repository. Once you have that file you can run the following to install all of your extensions. if you're interested in what extensions I am using I have [included my list of extensions](https://github.com/cfaddict/new-macbook-setup/blob/master/vscode-extensions.txt).

```bash
cat extensions.txt | xargs -L1 code --install-extension
```

After I did this and tweeted about it a lot of people let me know about another extension called sync settings. This will sync all of your visual studio extensions, settings, key bindings, etc across machines.

https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync

#### Fonts

I am a huge fan of the Dank Mono font. I install this and use it for most of my development. If I am writing documentation I will sometimes use a different font, it just depends.

[Dank Mono](https://dank.sh/)

#### User Settings

I have included my user settings in case you want to see what I use. I don't have much here but will try and update these soon.

### Node & NPM

If you're going to install Node I think the best way to do so is by using [Node Version Manager (NVM)](https://github.com/creationix/nvm). This to me has a few advantages over installing it from brew or even directly downloading it from their website.

*   You can install multiple versions of Node
    *   You can set a default version
    *   You can switch between these versions easily
*   Installs in your home directory
    *   You don't need special privileges
    *   No more sudo when installing packages globally

Once you have NVM you can install the latest stable realease (v10.12.0 at the time of this writing) using the following command.

```bash
nvm install stable
```

#### Global Packages to Install

```bash
npm install -g tldr
npm install -g typescript
npm install -g @vue/cli
npm install -g vuepress
npm install -g @angular/cli
npm install -g eslint
npm install -g gitbook-cli
npm install -g lodash
```

### Git Config

There is usually a default install of git but we used brew to install the latest earlier. Now that we are on the latest version of git we need to do a little configuration.

.gitconfig

*   git config --global user.email "dan@techelevator.com"
*   git config --global user.name "Dan Vega"
*   Aliases
    *   git config --global alias.add-commit '!git add -A && git commit'

### Databases

*   [PostgreSQL](https://www.postgresql.org/)
*   [Mongodb](https://www.mongodb.com/)
*   [MySQL](https://www.mysql.com/)

#### PostgreSQL

The easiest way to install PostgreSQL is by using HomeBrew.

```bash
brew install postgresql
```

When this is done installing you can have it start up automatically using the following command.

```bash
brew postgresql-upgrade-database
```

I don't need it that often so when I want to run it I can run the following command:

```bash
pg_ctl -D /usr/local/var/postgres start
```

Better yet I can add a few of aliases to my bash profile to make this even easier.

```bash
alias start_postgres="pg_ctl -D /usr/local/var/postgres start"
alias stop_postgres="pg_ctl -D /usr/local/var/postgres stop -s -m fast"
alias pgup="start_postgres"
alias pgdown="stop_postgres"
```

Our students also use DBVisualizer so I like to have that installed as well.

```bash
brew cask install dbvisualizer
```

#### MySQL

To get started with MySQL run the following command:

```bash
brew install mysql
```

To have MySQL automatically run when you computer starts:

```bash
brew services start mysql
```

OR you can start / stop it manually

```bash
mysql.server start
```

To be consistent with our PostgreSQL we can create a few aliases.

```bash
alias start_mysql="mysql.server start"
alias stop_mysql="mysql.server stop"
alias mysqlup="start_mysql"
alias mysqldown="stop_mysql"
```

### SDKMan

This is one of my favorite version managers because I use a lot of the Software Development Kits (SDKs) it manages. If you haven't heard of [SDKMan check them out here](https://sdkman.io/install). This is a list of SDKs I manage using SDKMan.

*   Java
*   Groovy
*   Grails
*   Gradle
*   Maven
*   Micronaut
*   Spring Boot
*   Kotlin

Here is a full list of SDKs https://sdkman.io/sdks

**Installation:** curl -s "https://get.sdkman.io" | bash

If you just type sdk install candidate it will install the latest stable version or you can install a specific version

```bash
sdk install java 8.0.191-oracle
```

If you need to get a list of versions you can ask for it:

```bash
sdk list java
```

### Browser Configuration

Turn on sync and sign into chrome, this brings all of my bookmarks and extensions. If you have any questions about any of these or why I install them please see the contact me section below.

**Extensions**

*   LastPass
*   Grammarly
*   Color Picker
*   LiveReload
*   uBlock Origin
*   privacy badger
*   oneTab
*   JSONViewer
*   Vue devtools

## System Preferences

I have a few things that I customize in preferences:

**Trackpad:**  
System Preferences > Trackpad > Scroll & Zoom:  
I uncheck scroll direction: Natural (It doesn’t feel natural for me)

**Dock:**  
System Preferences > Dock  
Change the size to small and turn on magnification  
I also remove all icons from the dock that i don't use

**Avatar:**  
System Preferences > Users & Groups > Edit Avatar

**Theme:**  
macOS Mojave introduced light & dark themes. I still stick with the light theme even though I use dark themes in almost every editor or program that I use. If you want to change this later simply go to System Preferences > General > Appearance

## Finder

I like to customize Finder so I can get to all of my most used places quickly.

**Locations**

*   Add Macintosh HD to locations so I can always get to the root hard drive
*   Home /Users/vega
*   screenshots (configure screenshot utility to save here)
    *   open screenshot > options > other location

**A few tips in finder**

*   cmd+shift+h (takes you home)
*   cmd . (show hidden files and folders)

## Work Setup

These are a list of applications and configuration I need for work. You may not need some of these tools but I thought I would share them here anyways.

Last Pass  
Slack  
Twitter (App Store)  
Screenflow

### Adobe Creative Suite

I am huge fan of Adobe and all of their products!

*   Photoshop CC
*   Illustrator CC
*   Premiere Pro CC
*   After Effects CC
*   Premiere Rush CC
*   XD

### Windows 10

At work I need to dual boot with macOS and Windows 10. We have a .NET track where the students use Windows (Visual Studio, SQL Server, etc…) and I need to be able to support them. The great thing about this is Apple has made this stupid simple using BootCamp Assistant. If you want to read more about this check out the document below.

[https://github.com/cfaddict/new-macbook-setup/blob/master/windws10.md](https://github.com/cfaddict/new-macbook-setup/blob/master/windws10.md)

## Conclusion

I had a lot of fun putting this together and I hope you picked up a new trick or 2. Whenever I find something new or a way to improve the installation process I will update the link below if you would like to follow along. Please let me know if I missed something that I should look into or if you have any tips and tricks.

[https://github.com/cfaddict/new-macbook-setup](https://github.com/cfaddict/new-macbook-setup)