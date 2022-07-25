import path from 'path'
import fs from 'fs-extra'
import ejs from 'ejs'
import { glob } from 'glob'
import { cwd } from '../constants'
import { IGeneratorParams } from 'types'

export const generate = async (params: IGeneratorParams) => {
  try {
    await fs.mkdir('./' + params.repoName)
    return new Promise((resolve, reject) => {
      const base = path.resolve(__dirname, `../../templates/${params.template}`)
      console.log(base)
      glob(
        '**/*',
        {
          dot: true,
          cwd: base,
        },
        (err, files) => {
          if (err) return reject(err)

          files.forEach((filename) => {
            const filepath = path.resolve(base, filename)
            const dist = path.resolve(cwd, params.repoName, filename)
            const distPath = dist.replace(/ignore\.tpl$/, 'ignore')
            const stat = fs.statSync(filepath)
            console.log(dist)
            console.log(cwd)
            if (stat.isDirectory()) {
              if (filepath.includes('.tpl')) return
              fs.copySync(filepath, dist)
              return
            }
            const contents = fs.readFileSync(filepath, 'utf-8')
            const template = ejs.compile(contents)
            fs.outputFileSync(distPath, template(params))
          })
          console.log('🎉🎉 generate success!')
          resolve(0)
        }
      )
    })
  } catch (err) {
    if (err.code == 'EEXIST') {
      console.error(`文件夹${params.repoName}已经存在`)
    }
  }
}
