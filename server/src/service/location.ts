// handles the joins and business logic for getting the data ready
// TODO refactor into class
import * as locationRepo from '../repositories/location';

export async function createLocation(data) {
    const location = await locationRepo.createLocation(data);

    // if (!location) {
    //     throw boom.internal('create location failed');
    // }

    return location;
}

export async function getLocationById(data) {
    const location = await locationRepo.getLocationById(data);

    // if (!location) {
    //     throw boom.internal('get location failed');
    // }

    return location;
}

export async function updateLocation(data) {
    const location = await locationRepo.updateLocation(data);

    // if (!location) {
    //     throw boom.internal('get location failed');
    // }

    return location;
}

export async function deleteLocation(data) {
    const location = await locationRepo.deleteLocation(data);

    // if (!location) {
    //     throw boom.internal('get location failed');
    // }

    return location;
}
