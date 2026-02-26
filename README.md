<p align='center'>
  <img width="600" src="https://cdn.jsdelivr.net/gh/yuyinws/static@master/2026/02/upgit_20260226_1772089231.png" >
</p>

<p align='center'>
 Inspect and understand your Oxc toolchain better
</p>

## ✨ Features

- **Easy to use**: Launch from the CLI or integrate with [Vite Devtools](https://github.com/vitejs/devtools)

- **Visualize lint output**: Inspect lint output in an intuitive interface

- **Config helper**: Easier to understand oxlint and oxfmt config file

## 📷 Snapshots

![CleanShot 2026-02-26 at 15.58.11@2x](https://cdn.jsdelivr.net/gh/yuyinws/static@master/2026/02/upgit_20260226_1772092928.png)

![CleanShot 2026-02-26 at 15.59.26@2x](https://cdn.jsdelivr.net/gh/yuyinws/static@master/2026/02/upgit_20260226_1772092944.png)

![CleanShot 2026-02-26 at 16.00.25@2x](https://cdn.jsdelivr.net/gh/yuyinws/static@master/2026/02/upgit_20260226_1772092955.png)

## 🚀 Usage

### Install

```sh
npm install -D oxc-inspector

pnpm add -D oxc-inspector

yarn add -D oxc-inspector

bun add -D oxc-inspector
```

### Generate lint logs

```sh
npx oxc-inspector lint
```

### Launch UI

```sh
npx oxc-inspector
```

### Integrate Vite Devtools

```ts
// vite.config.ts
import { DevTools } from '@vitejs/devtools'
import { defineConfig } from 'vite'
import { DevToolsOxc } from 'oxc-inspector/vite'

export default defineConfig({
  plugins: [DevTools(), DevToolsOxc()],
  build: {
    rolldownOptions: {
      devtools: {}, // enable devtools mode
    },
  },
})
```

## License

[MIT](./LICENSE) License © 2025-PRESENT [Leo](https://github.com/yuyinws)
