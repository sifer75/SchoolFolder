/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const FoldersController = () => import('#controllers/folders_controller')
const CardsController = () => import('#controllers/cards_controller')
import router from '@adonisjs/core/services/router'

router.post('/folder', [FoldersController, 'CreateFolder'])
router.get('/folders', [FoldersController, 'GetAllFolders'])
router.put('/folder/:id', [FoldersController, 'UpdateFolder'])

router.post('/card', [CardsController, 'CreateCard'])
router.put('/card/:id', [CardsController, 'UpdateCard'])
