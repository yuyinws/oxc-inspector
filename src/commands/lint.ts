import { intro, outro, spinner } from '@clack/prompts'
import { define } from 'gunshi'
import {
  execOxlintCommand,
  getOxcInspectorVersion,
  getOxlintConfig,
  getOxlintVersion,
  groupByFilename,
} from '../node/utils/oxlint'
import { mkdir, writeFile } from 'node:fs/promises'
import { cwd } from 'node:process'
import c from 'ansis'
import { relative, resolve } from 'pathe'

export const lint = define({
  name: 'lint',
  description: 'Generate oxlint logs',
  run: async ({ _ }) => {
    const spin = spinner()

    intro(`Using Oxc Inspector v${getOxcInspectorVersion()}`)
    spin.start('Running Oxlint...')
    const oxLintVersion = await getOxlintVersion()
    const config = await getOxlintConfig()
    const rawOutput = execOxlintCommand(_, false)
    const groupedOutput = await groupByFilename(rawOutput)

    const logsRootDir = resolve(cwd(), '.oxc-inspector', 'lint')
    await mkdir(logsRootDir, { recursive: true })
    const sessionId = Date.now()
    const sessionDir = resolve(logsRootDir, String(sessionId))
    await mkdir(sessionDir, { recursive: true })
    await writeFile(
      resolve(sessionDir, 'meta.json'),
      JSON.stringify(
        {
          version: oxLintVersion,
          timestamp: sessionId,
          summary: groupedOutput.summary,
        },
        null,
        2,
      ),
      'utf-8',
    )
    await writeFile(
      resolve(sessionDir, 'logs.json'),
      JSON.stringify(
        {
          files: groupedOutput.files,
          config: config ? JSON.parse(config) : null,
        },
        null,
        2,
      ),
      'utf-8',
    )
    spin.stop()

    outro(`Session created: ${c.cyan(relative(cwd(), sessionDir))}`)
    process.exit(0)
  },
})
