import { Router } from 'express';
import * as collectionController from '../controllers/collection';

const collectionRouter = Router();

collectionRouter
    .get('/:id', collectionController.getCollectionById)
    .delete('/:id', collectionController.deleteCollection);

collectionRouter
    .post('', collectionController.createCollection)
    .put('', collectionController.updateCollection);

export { collectionRouter };
