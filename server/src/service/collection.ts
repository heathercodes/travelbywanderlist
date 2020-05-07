// TODO refactor into class
import { Location, Wanderlist } from '../models';
import * as collectionRepo from '../repositories/collection';
import * as locationRepo from '../repositories/location';

export async function createCollection(data): Promise<Wanderlist> {
    const { collection } = data;
    const newCollection = await collectionRepo.createCollection(collection);

    let locations = []
    if (data.locations) {
        locations = await Promise.all(
            data.locations.map((loc) => locationRepo
                .updateLocation({ wanderlist_id: newCollection.id, ...loc })),
        );
    }

    return { collection: newCollection, locations };
}

export async function getCollectionById(data): Promise<Wanderlist> {
    const collection = await collectionRepo.getCollectionById(data);
    const locations = await locationRepo.getLocationsByCollectionId(data);

    if (locations) {
        return { collection, locations };
    }

    return { collection };
}

export async function updateCollection(data): Promise<Wanderlist> {
    const { collection } = data;
    const updatedCollection = await collectionRepo.updateCollection(collection);
    const locations: Location[] = await Promise.all(
        data.locations.map((loc) => {
            if (!loc.id) {
                return locationRepo.createLocation({ wanderlist_id: collection.id, ...loc });
            }
            return locationRepo.updateLocation({ wanderlist_id: collection.id, ...loc });
        }),
    );

    if (locations) {
        return { collection: updatedCollection, locations };
    }

    return { collection: updatedCollection };
}

export async function deleteCollection(data): Promise<number> {
    await locationRepo.deleteLocationByCollectionId({ id: data.id });

    const id = await collectionRepo.deleteCollection(data);

    return id;
}
