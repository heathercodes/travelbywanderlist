// handles the joins and business logic for getting the data ready
// TODO refactor into class
import { Location } from '../models';
import * as locationRepo from '../repositories/location';

export async function createLocation(data): Promise<number> {
    const id = await locationRepo.createLocation(data);

    return id;
}

export async function getLocationById(data): Promise<Location> {
    const location = await locationRepo.getLocationById(data);

    return location;
}

export async function updateLocation(data): Promise<Location> {
    const location = await locationRepo.updateLocation(data);

    return location;
}

export async function deleteLocationById(data): Promise<number> {
    const id = await locationRepo.deleteLocationById(data);

    return id;
}
