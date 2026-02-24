import { defineRpcFunction } from '@vitejs/devtools-kit'
import { getOxlintConfig } from '../../utils/oxlint'

export const oxlintGetConfigFile = defineRpcFunction({
  name: 'oxc-inspector:get-lint-config-file',
  type: 'query',
  setup: () => {
    return {
      handler: async () => {
        const config = await getOxlintConfig()
        return config
      },
    }
  },
})
