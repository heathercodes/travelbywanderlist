import { Router } from 'express';
import * as collectionController from '../controllers/collection';

const collectionRouter = Router();

collectionRouter
    .get('/:id', collectionController.getCollectionById)
    .delete('/:id', collectionController.deleteCollection)
    .put('/:id', collectionController.updateCollection);

collectionRouter.post('', collectionController.createCollection);

export { collectionRouter };
