import { Router } from 'express';
import * as locationController from '../controllers/location';

const locationRouter = Router();

locationRouter.post('', locationController.createLocation);

locationRouter
    .get('/:id', locationController.getLocationById)
    .put('/:id', locationController.updateLocation)
    .delete('/:id', locationController.deleteLocationById);

export { locationRouter };
