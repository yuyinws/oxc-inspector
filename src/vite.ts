import type { PluginWithDevTools } from '@vitejs/devtools-kit'
import { rpcFunctions } from './node/rpc'
import { clientPublicDir } from './dirs'

export function DevToolsOxc(): PluginWithDevTools {
  return {
    name: 'oxc-inspector',
    devtools: {
      setup(ctx) {
        for (const fn of rpcFunctions) {
          ctx.rpc.register(fn)
        }

        ctx.views.hostStatic('/.oxc-inspector/', clientPublicDir)

        ctx.docks.register({
          id: 'oxc-inspector',
          title: 'Oxc Inspector',
          icon: 'https://viteplus.dev/projects/oxc.svg',
          type: 'iframe',
          url: '/.oxc-inspector/',
        })
      },
    },
  }
}
