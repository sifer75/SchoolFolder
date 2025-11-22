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

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })

project.addSourceFilesAtPaths(`${modelsDir}/*.ts`)

project.getSourceFiles().forEach((file) => {
  file.getClasses().forEach((cls) => {
    const modelName = `${cls.getName()}Type`
    const properties = cls.getProperties().map((prop) => {
      const propName = prop.getName()
      let propType = prop.getType().getText()

      // --- Nettoyage des types ---
      propType = propType
        .replace(/luxon\.DateTime<.*?>/g, 'DateTime')
        .replace(/import\(".*?"\)\./g, '')
        .replace(/HasMany<.*?>/g, `${propName.charAt(0).toUpperCase() + propName.slice(1)}[]`)
        .replace(/BelongsTo<.*?>/g, `${propName.charAt(0).toUpperCase() + propName.slice(1)}`)
        .replace(/HasOne<.*?>/g, `${propName.charAt(0).toUpperCase() + propName.slice(1)}`)
        .replace(/typeof\s+.*?\.default/g, 'any') // supprime les typeof import()
        .replace(/\s+/g, ' ')
        .replace(/\s*\|\s*undefined/g, '')
        .replace(/\s*\|\s*null\s*\|\s*null/g, ' | null')
        .trim()

      const optionalFlag = prop.hasQuestionToken() ? '?' : ''

      //    if (
      //   propType.includes('HasMany') ||
      //   propType.includes('BelongsTo') ||
      //   propType.includes('HasOne') ||
      //   propType.includes('DateTime')
      // ) {
      //   propType += ' | null'
      // }

      return `  ${propName}${optionalFlag}: ${propType};`
    })

    const tsInterface = `export interface ${modelName} {\n${properties.join('\n')}\n}\n`

    fs.writeFileSync(path.join(outputDir, `${modelName}.d.ts`), tsInterface)
    console.log(`Types générés pour ${modelName}`)
  })
})
console.log('Génération des types terminée.')
