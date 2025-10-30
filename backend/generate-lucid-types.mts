import { Project } from 'ts-morph'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const project = new Project({
  tsConfigFilePath: './tsconfig.json',
})

const modelsDir = path.join(__dirname, 'app/models')
const outputDir = path.join(__dirname, '../frontend/src/types')

if (fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })

project.addSourceFilesAtPaths(`${modelsDir}/*.ts`)

project.getSourceFiles().forEach((file) => {
  file.getClasses().forEach((cls) => {
    const modelName = cls.getName()
    const properties = cls.getProperties().map((prop) => {
      const propName = prop.getName()
      const propType = prop.getType().getText()
      return `  ${propName}: ${propType};`
    })

    const tsInterface = `export interface ${modelName} {\n${properties.join('\n')}\n}\n`

    fs.writeFileSync(path.join(outputDir, `${modelName}.d.ts`), tsInterface)
    console.log(`Types générés pour ${modelName}`)
  })
})
console.log('Génération des types terminée.')
