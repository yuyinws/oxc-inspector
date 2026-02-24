import { defineRpcFunction } from '@vitejs/devtools-kit'
import { getOxfmtConfig } from '../../utils/oxfmt'

export const oxfmtGetConfigFile = defineRpcFunction({
  name: 'oxc-inspector:get-fmt-config-file',
  type: 'query',
  setup: () => {
    return {
      handler: async () => {
        const config = await getOxfmtConfig()
        return config
      },
    }
  },
})
