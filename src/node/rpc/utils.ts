import type { DevToolsNodeContext } from '@vitejs/devtools-kit'
import { join } from 'pathe'
import { OxlintLogsManager } from '../utils/logs-manager'

const weakMap = new WeakMap<DevToolsNodeContext, OxlintLogsManager>()

export function getLogsManager(context: DevToolsNodeContext): OxlintLogsManager {
  let manager = weakMap.get(context)!
  if (!manager) {
    const dir = join(process.cwd(), '.oxc-inspector', 'lint')
    if (!dir) {
      console.warn(
        '[Oxc Inspector] Oxc Inspector logs directory `.oxc-inspector` not found, you might want to run build with `npx oxc-inspector` to generate it first. Read more: https://github.com/yuyinws/oxc-inspector',
      )
    }
    manager = new OxlintLogsManager(dir)
  }
  return manager
}

export function setLogsManager(context: DevToolsNodeContext, manager: OxlintLogsManager) {
  weakMap.set(context, manager)
}
