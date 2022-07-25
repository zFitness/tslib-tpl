import path from 'path'
import prompts from 'prompts'
import { pascalCase } from 'pascal-case'
import { cwd, templates } from '../constants'
import { generate } from './generate'
import execa from 'execa'

const required = (value: string) => (!value ? 'this field is required' : true)

export const init = async () => {
  const params = await prompts([
    {
      type: 'select',
      name: 'template',
      message: 'Which template do you need to install?',
      choices: templates.map((name) => ({
        title: pascalCase(path.basename(name)),
        value: path.basename(name),
      })),
      validate: required,
    },
    {
      type: 'text',
      name: 'repoName',
      message: 'What is the repo name of the library? Like "ts-tools"',
      initial: 'ts-tools',
      validate: required,
    },
    {
      type: 'text',
      name: 'packageName',
      message: 'What is the package name of the library? Like "ts-tools"',
      initial: 'ts-tools',
      validate: required,
    },
    {
      type: 'text',
      name: 'userName',
      message: 'What is your GitHub username?',
      validate: required,
    },
  ])
  await generate({ ...params })
  execa('yarn', ['install', '--ignore-engines'], { cwd }).stdout.pipe(
    process.stdout
  )
}