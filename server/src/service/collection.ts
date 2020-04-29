// TODO refactor into class
import * as collectionRepo from '../repositories/collection';
import * as locationRepo from '../repositories/location';

export async function createCollection(data) {
    const { collection } = data;
    const collectionId = await collectionRepo.createCollection(collection);

    // if (!collectionId)
    //     throw boom.internal('create wanderlist failed');
    // }

    if (data.locations) {
        const locationIds = await Promise.all(
            data.locations.map(loc => {
                return locationRepo.updateLocation({ wanderlist_id: collectionId, ...loc });
            })
        );

        return { collectionId, locationIds };
    }

    return { collectionId };
}

export async function getCollectionById(data) {
    const collection = await collectionRepo.getCollectionById(data);

    // if (!location) {
    //     throw boom.internal('get location failed');
    // }

    return collection;
}

export async function updateCollection(data) {
    const { collection } = data;
    const updatedCollection = await collectionRepo.updateCollection(collection);

    if (data.locations) {
        const locationIds = await Promise.all(
            data.locations.map(loc => {
                if (!loc.id) {
                    return locationRepo.createLocation({ wanderlist_id: collection.id, ...loc });
                }

                return locationRepo.updateLocation({ wanderlist_id: collection.id, ...loc });
            })
        );

        return { ...updatedCollection, locationIds };
    }

    return { updatedCollection };
}

export async function deleteCollection(data) {
    const counts = await locationRepo.deleteLocationByCollectionId({ id: data.id });;

    const ok = await collectionRepo.deleteCollection(data);


    // if (!location) {
    //     throw boom.internal('get location failed');
    // }

    return { ok, counts };
}
