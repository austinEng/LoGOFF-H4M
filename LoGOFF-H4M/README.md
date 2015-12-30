# LoGOFF-H4M

## How Does This Work?
### Or How Theoretically will it Work?
The client side is a chrome extension which injects our source client files into welogoff.com. Note that because of this, it'll only work in a Chrome browser. From there, we can make calls to their server to get things such as the current user, name, etc.

A separate Node.js server using Mongoose as a database plugin will then be used to store our own data and stuff like that.

## Setting up the Client
First, clone the repository.
Then, in Chrome: Settings -> Extensions -> Load Unpacked Extension
Browse to the "client" folder in the repo and select that.
Now when you visit welogoff.com, it should inject itself into the page. When making changes to the code, you must Reload the extension in the Chrome extension settings to see the changes take effect

## Setting up the Server
Bunch of things to install: Node Package Manager, Node.js, MongoDB
If everything goes well, from the root directory of the repo, you should be able to do "npm install" to install dependencies (other packages the project depends on) and then "npm start" to get the sever started.