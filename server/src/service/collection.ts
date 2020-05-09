// TODO refactor into class
import { Location, Wanderlist, CollectionUpdateReq } from '../models';
import * as collectionRepo from '../repositories/collection';
import * as locationRepo from '../repositories/location';

export async function createCollection(data: CollectionUpdateReq): Promise<Wanderlist> {
    const { collection } = data;
    const newCollection = await collectionRepo.createCollection(collection);

    let locations: Location[] = [];
    if (data.locations) {
        locations = await Promise.all(
            data.locations.map((loc: Location) =>
                locationRepo.updateLocation({ wanderlist_id: newCollection.id, ...loc })
            )
        );
    }

    return { collection: newCollection, locations };
}

export async function getCollectionById(data: { id: number }): Promise<Wanderlist> {
    const collection = await collectionRepo.getCollectionById(data);
    const locations = await locationRepo.getLocationsByCollectionId(data);

    if (locations) {
        return { collection, locations };
    }

    return { collection };
}

export async function updateCollection(data: CollectionUpdateReq): Promise<Wanderlist> {
    const { collection } = data;
    const updatedCollection = await collectionRepo.updateCollection(collection);

    let locations: Location[] = [];

    if (data.locations) {
        locations = await Promise.all(
            data.locations.map((loc: Location) => {
                if (loc.id) {
                    return locationRepo.updateLocation({ wanderlist_id: collection.id, ...loc });
                }

                return locationRepo.createLocation({ wanderlist_id: collection.id, ...loc });
            })
        );
    }

    if (locations) {
        return { collection: updatedCollection, locations };
    }

    return { collection: updatedCollection };
}

export async function deleteCollection(data: { id: number }): Promise<number> {
    await locationRepo.deleteLocationByCollectionId({ id: data.id });

    const id = await collectionRepo.deleteCollection(data);

    return id;
}
