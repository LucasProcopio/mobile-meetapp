<h1 align="center">Welcome to mobile-meetapp 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/LucasHProcopio" target="_blank">
    <img alt="Twitter: LucasHProcopio" src="https://img.shields.io/twitter/follow/LucasHProcopio.svg?style=social" />
  </a>
</p>

> An event aggregator for developers MeetApp (Meetup + App)

> This is the mobile app for meetup subscribers only

---

## Install

> **NOTE:** this app was created and tested on **android devices** only.

- To run this aplication make sure you have the [backend server](https://github.com/LucasProcopio/backend-meetapp) up and running.

- Click [HERE](https://github.com/LucasProcopio/backend-meetapp) and follow the backend installation instructions before continue.

- After you have your backend server up an running, enter the root folder of this application on a terminal or windows cmd and run the command below to install all dependencies

```sh
yarn
```

---

- NOTE: if you are using macOs or Ubuntu OS, after all the projects dependencies are installed run `chmod -R 777 ./android` on the root folder of the project to give permissions so the app will build and run correctly

- to run this application follow [this instructions](https://facebook.github.io/react-native/docs/getting-started), make sure you select the tab **React Native CLI Quickstart** and set the target OS: **android**

- NOTE: add the correct IP address and port values to the api config file located at `src/services/api.js` you should set the value for the **baseURL** variable, so the app can retrieve the api data correctly.

## Usage

- make sure you have an android deveice up and running, run `adb devices` on a terminal to see the connected devices on your OS

- At the root folder of this application on a terminal or windowns cmd run the command below

```sh
react-native run-android
```

## Author

👤 **Lucas Henrique Procopio**

- Twitter: [@LucasHProcopio](https://twitter.com/LucasHProcopio)
- Github: [@LucasProcopio](https://github.com/LucasProcopio)
