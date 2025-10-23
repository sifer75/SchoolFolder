import Folder from '#models/folder'
import type { HttpContext } from '@adonisjs/core/http'

export default class FoldersController {
  async CreateFolder({ request, response }: HttpContext) {
    try {
      const data = request.only(['name', 'parent_id'])
      const folder = new Folder()
      folder.name = data.name
      folder.parentId = data.parent_id
      await folder.save()
      return response.status(201).json(folder)
    } catch (e) {
      console.log(e, 'error')
      return response.status(500).json({ e: 'Impossible de créer le dosser' })
    }
  }

  async GetAllFolders({ response }: HttpContext) {
    try {
      const folders = await Folder.query()
        .whereNull('parentId') // Ne récupérer que les dossiers racines
        .preload('Folders', (query) => {
          query.preload('cards') // Précharger les cartes pour les sous-dossiers
          query.preload('Folders', (subQuery) => {
            subQuery.preload('cards') // Précharger les cartes pour les sous-sous-dossiers
            // Vous pouvez ajouter d'autres niveaux de preload ici si nécessaire
          })
        })
        .preload('cards') // Précharger les cartes pour les dossiers racines

      return response.status(200).json(folders)
    } catch (e) {
      console.log(e)
      return response.status(500).json({ e: 'Impossible de récupérer les dossiers' })
    }
  }

  async UpdateFolder({ params, request, response }: HttpContext) {
    try {
      const data = request.only(['name'])
      const folderId = await params.id
      const folder = await Folder.findOrFail(folderId)
      if (!folder) return response.status(404).json({ e: 'Dossier introuvable' })
      folder.name = data.name
      await folder.save()
      return response.status(200).json(folder)
    } catch (e) {
      console.log(e, 'error')
      return response.status(500).json({ e: 'Impossible de modifier le dossier' })
    }
  }
}
