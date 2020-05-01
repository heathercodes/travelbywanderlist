// TODO refactor into class
import { Collection } from '../models';
import * as collectionRepo from '../repositories/collection';
import * as locationRepo from '../repositories/location';

export async function createCollection(data): Promise<number> {
    const { collection } = data;
    const collectionId = await collectionRepo.createCollection(collection);

    if (data.locations) {
        const locationIds = await Promise.all(
            data.locations.map((loc) => locationRepo
                .updateLocation({ wanderlist_id: collectionId, ...loc })),
        );

        return { collectionId, locationIds };
    }

    return collectionId;
}

export async function getCollectionById(data): Promise<Collection> {
    const collection = await collectionRepo.getCollectionById(data);

    return collection;
}

export async function updateCollection(data): Promise<Collection> {
    const { collection } = data;
    const updatedCollection = await collectionRepo.updateCollection(collection);

    if (data.locations) {
        await Promise.all(
            data.locations.map((loc) => {
                if (!loc.id) {
                    return locationRepo.createLocation({ wanderlist_id: collection.id, ...loc });
                }

                return locationRepo.updateLocation({ wanderlist_id: collection.id, ...loc });
            }),
        );
    }

    return updatedCollection;
}

export async function deleteCollection(data): Promise<number> {
    await locationRepo.deleteLocationByCollectionId({ id: data.id });

    const id = await collectionRepo.deleteCollection(data);

    return id;
}
