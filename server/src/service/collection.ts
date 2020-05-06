// TODO refactor into class
import { Location, Wanderlist } from '../models';
import * as collectionRepo from '../repositories/collection';
import * as locationRepo from '../repositories/location';

export async function createCollection(data): Promise<number> {
    const { collection } = data;
    const collectionId = await collectionRepo.createCollection(collection);

    if (data.locations) {
        await Promise.all(
            data.locations.map((loc) => locationRepo
                .updateLocation({ wanderlist_id: collectionId, ...loc })),
        );
    }

    return collectionId;
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
    console.log(data.locations);
    const locations: Location[] = await Promise.all(
        data.locations.map((loc) => {
            if (!loc.id) {
                console.log(loc);
                return locationRepo.createLocation({ wanderlist_id: collection.id, ...loc });
            }
            console.log(loc);
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
