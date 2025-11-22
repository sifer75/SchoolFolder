import Card from '#models/card'
import type { HttpContext } from '@adonisjs/core/http'

export default class CardsController {
  async CreateCard({ request, response }: HttpContext) {
    try {
      const data = request.only(['name', 'content', 'folder_id'])
      const card = new Card()
      card.name = data.name
      card.content = data.content
      card.folderId = data.folder_id
      await card.save()
      return response.status(201).json(card)
    } catch (e) {
      console.log(e, 'error')
      return response.status(500).json({ e: 'Impossible de créer la carte' })
    }
  }

  async UpdateCard({ params, request, response }: HttpContext) {
    try {
      const data = request.only(['name', 'content'])
      const cardId = await params.id
      const card = await Card.findOrFail(cardId)
      if (!card) return response.status(404).json({ e: 'Carte introuvable' })
      card.name = data.name
      card.content = data.content
      await card.save()
      return response.status(200).json(card)
    } catch (e) {
      console.log(e, 'error')
      return response.status(500).json({ e: 'Impossible de modifier la carte' })
    }
  }

  async GetAllCardsFromFolder({ params, response }: HttpContext) {
    try {
      const folderId = params.id
      const cards = await Card.query().where('folder_id', folderId)
      console.log(cards, 'cards fetched')
      return response.status(200).json(cards)
    } catch (e) {
      console.log(e, 'error')
      return response.status(500).json({ e: 'Impossible de récupérer les cartes' })
    }
  }
}
