# Welcome to your digitalGauges UI 👋


## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

# Digital Gauges UI

A TypeScript + React user interface that configures and drives ESP32-based digital gauges in real time over WebSockets. Designed for fast iteration on layout, colors, ranges, and alert zones—while streaming live sensor data from your ESP32.

# What it does

Realtime telemetry: subscribes to sensor values over WebSocket and renders smooth gauges.

Live customization: change colors, ranges, units, labels, needle size/style, and danger zones without reflashing firmware.

Device discovery: connect via IP, mDNS (e.g., ws://esp32-gauges.local), or ESP32 AP mode.

Offline-friendly: runs as a lightweight web app; optional PWA install if you enable it.

Architecture

Frontend: React + TypeScript (hooks, functional components).

Transport: WebSocket (ws://<esp32>/ws) for telemetry + config commands.

State: Local state with React hooks; optional persistence via LocalStorage.


This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).
