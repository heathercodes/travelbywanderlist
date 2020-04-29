import { Router, Request, Response } from 'express';
// const { check } = require('express-validator/check');
// import collectionController from '../controllers/collection';

const collectionRouter = Router();

// collectionRouter.get('/:id', locationController.getCollectionById);
// collectionRouter.post('', locationController.saveCollection);
// collectionRouter.put('/:id', locationController.updateCollectionById);
// collectionRouter.delete('/:id', locationController.deleteCollectionById);

export { collectionRouter };


// create collection -> needs to support creating with and without locations already on map

// get a collection

// update a collection -> includes saving new locations that have been added to the map in that collection
// delete a collection -> includes locations within it