import { argv } from 'node:process'
import { cli } from 'gunshi'
import { mainCommand } from './commands/main'
import { lint } from './commands/lint'
import { getOxcInspectorVersion } from './node/utils/oxlint'

cli(argv.slice(2), mainCommand, {
  name: 'oxc-inspector',
  version: getOxcInspectorVersion(),
  renderHeader: () => Promise.resolve(''),
  subCommands: {
    lint,
  },
})
