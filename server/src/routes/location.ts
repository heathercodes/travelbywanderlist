import { Router } from 'express';
import * as locationController from '../controllers/location';

const locationRouter = Router();

locationRouter.get('/:id', locationController.getLocationById);
locationRouter.post('', locationController.createLocation);
locationRouter.put('/:id', locationController.updateLocation);
locationRouter.delete('/:id', locationController.deleteLocationById);

export { locationRouter };
