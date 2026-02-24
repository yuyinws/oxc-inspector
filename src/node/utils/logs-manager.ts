import type { Logs, Meta } from '../../types'
import { existsSync } from 'node:fs'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'pathe'

export class OxlintLogsManager {
  constructor(readonly dir: string) {}

  async list(): Promise<Meta[] | null> {
    if (!existsSync(this.dir)) {
      return []
    }
    const sessions = await readdir(this.dir, {
      withFileTypes: true,
    })
    const metas = await Promise.all(
      sessions
        .filter(entry => entry.isDirectory())
        .filter(entry => existsSync(join(this.dir, entry.name, 'meta.json')))
        .sort((a, b) => {
          return Number(b.name) - Number(a.name)
        })
        .map(async (entry): Promise<any | null> => {
          const metaPath = join(this.dir, entry.name, 'meta.json')
          const content = await readFile(metaPath, 'utf-8')
          try {
            return JSON.parse(content)
          } catch {
            return null
          }
        }),
    )
    return metas.filter(Boolean)
  }

  async loadSession(session: string): Promise<{ meta: Meta; logs: Logs } | null> {
    try {
      const metaPath = join(this.dir, session, 'meta.json')
      const logsPath = join(this.dir, session, 'logs.json')
      const meta = await readFile(metaPath, 'utf-8')
      const logs = await readFile(logsPath, 'utf-8')
      return {
        meta: JSON.parse(meta),
        logs: JSON.parse(logs),
      }
    } catch {
      return null
    }
  }

  async createSession(meta: string, logs: string) {
    const session = new Date().getTime()
    const metaPath = join(this.dir, String(session), 'meta.json')
    const logsPath = join(this.dir, String(session), 'logs.json')
    await writeFile(metaPath, meta)
    await writeFile(logsPath, logs)
    return session
  }
}
