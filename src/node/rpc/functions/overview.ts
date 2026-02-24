import { defineRpcFunction } from '@vitejs/devtools-kit'
import { x } from 'tinyexec'

type Package = {
  installed: boolean
  version: string | undefined
  tagUrl: string | undefined
}

export const overview = defineRpcFunction({
  name: 'oxc-inspector:overview',
  type: 'query',
  setup: () => {
    return {
      handler: async () => {
        let oxlint: Package = {
          installed: false,
          version: undefined,
          tagUrl: undefined,
        }
        let oxfmt: Package = {
          installed: false,
          version: undefined,
          tagUrl: undefined,
        }

        try {
          const { stdout } = await x('oxlint', ['--version'])
          oxlint.installed = true
          oxlint.version = stdout.split(' ')[1]?.trim().replaceAll('\n', '') ?? undefined
          oxlint.tagUrl = `https://github.com/oxc-project/oxc/releases/tag/oxlint_v${oxlint.version}`
        } catch {
          oxlint.installed = false
        }
        try {
          const { stdout } = await x('oxfmt', ['--version'])
          oxfmt.installed = true
          oxfmt.version = stdout.split(' ')[1]?.trim().replaceAll('\n', '') ?? undefined
          oxfmt.tagUrl = `https://github.com/oxc-project/oxc/releases/tag/oxfmt_v${oxfmt.version}`
        } catch {
          oxfmt.installed = false
        }
        return {
          oxlint,
          oxfmt,
        }
      },
    }
  },
})
