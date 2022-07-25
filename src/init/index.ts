import path from 'path'
import prompts from 'prompts'
import { pascalCase } from 'pascal-case'
import { templates } from '../constants'
import { generate } from './generate'

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
      name: 'description',
      message: 'A description about the library?',
    },
    {
      type: 'text',
      name: 'packageName',
      message: 'What is the npm package name of the library? Like "ts-tools"',
      initial: 'ts-tools',
      validate: required,
    },
    {
      type: 'text',
      name: 'author',
      message: 'What is your GitHub username?',
      validate: required,
    },
  ])
  await generate({ ...params })
}
