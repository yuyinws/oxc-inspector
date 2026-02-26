import { intro, outro, spinner, log } from '@clack/prompts'
import { define } from 'gunshi'
import {
  execOxlintCommand,
  getOxcInspectorVersion,
  getOxlintConfig,
  getOxlintVersion,
  groupByFilename,
} from '../node/utils/oxlint'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { cwd } from 'node:process'
import c from 'ansis'
import { relative, resolve } from 'pathe'

export const lint = define({
  name: 'lint',
  description: 'Generate oxlint logs',
  run: async ({ _ }) => {
    const spin = spinner()

    intro(`Oxc Inspector ${c.cyan(`v${getOxcInspectorVersion()}`)}`)

    const gitignorePath = resolve(cwd(), '.gitignore')
    let appended = false
    try {
      const content = await readFile(gitignorePath, 'utf-8')
      const hasEntry = content.split('\n').some(line => {
        const trimmed = line.trim()
        return trimmed !== '' && !trimmed.startsWith('#') && /\.oxc-inspector/.test(trimmed)
      })
      if (!hasEntry) {
        const append = content.endsWith('\n') ? '.oxc-inspector\n' : '\n.oxc-inspector\n'
        await writeFile(gitignorePath, content + append, 'utf-8')
        appended = true
      }
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        await writeFile(gitignorePath, '.oxc-inspector\n', 'utf-8')
        appended = true
      } else {
        throw err
      }
    }
    if (appended) {
      log.info('Appended .oxc-inspector to .gitignore')
    }

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
