import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Card from './card.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class Folder extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare parentId: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Card)
  declare cards: HasMany<typeof Card>

  @belongsTo(() => Folder, {
    foreignKey: 'parentId',
  })
  declare parent: BelongsTo<typeof Folder>

  @hasMany(() => Folder, {
    foreignKey: 'parentId',
  })
  declare Folders: HasMany<typeof Folder>
}
