import path from 'path'
import fs from 'fs-extra'
import { glob } from 'glob'

export const cwd = process.cwd()

export const entry = path.resolve(cwd, 'src/index.ts')

export const templates = glob.sync(path.resolve(__dirname, '../templates/*'))

let pkg: any = {}

try {
  pkg = fs.readJSONSync(path.resolve(cwd, 'package.json'))
} catch {
  pkg = {}
}

export { pkg }
