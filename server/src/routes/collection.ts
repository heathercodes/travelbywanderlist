import { Router } from 'express';
import * as collectionController from '../controllers/collection';

const collectionRouter = Router();

collectionRouter.get('/:id', collectionController.getCollectionById);
collectionRouter.post('', collectionController.createCollection);
collectionRouter.put('', collectionController.updateCollection);
collectionRouter.delete('/:id', collectionController.deleteCollection);

export { collectionRouter };
