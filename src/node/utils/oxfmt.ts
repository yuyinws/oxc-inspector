import { readFile } from 'node:fs/promises'
import { cwd } from 'node:process'
import { resolve } from 'pathe'

export async function getOxfmtConfig() {
  const jsonPath = resolve(cwd(), '.oxfmtrc.json')
  const jsoncPath = resolve(cwd(), '.oxfmtrc.jsonc')
  try {
    const config = await readFile(jsonPath, 'utf-8')
    return config
  } catch {
    try {
      const config = await readFile(jsoncPath, 'utf-8')
      return config
    } catch {
      return null
    }
  }
}
