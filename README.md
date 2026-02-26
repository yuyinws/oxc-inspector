<p align='center'>
  <img src="https://cdn.jsdelivr.net/gh/yuyinws/static@master/2026/02/upgit_20260226_1772086007.png" >
</p>

<p align='center'>
 Inspect and understand your Oxc toolchain better
</p>

## ✨ Features

- **Easy to use**: Launch from the CLI or integrate with [Vite Devtools](https://github.com/vitejs/devtools)

- **Visualize lint results**: View and explore lint output in an intuitive interface

- **Config helper**: Easier to understand oxlint and oxfmt config files

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
