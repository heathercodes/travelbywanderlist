import { Location, Wanderlist, CollectionUpdateReq } from '../models';
import * as collectionRepo from '../repositories/collection';
import * as locationRepo from '../repositories/location';

export async function createCollection(data: CollectionUpdateReq): Promise<Wanderlist> {
    const { collection } = data;
    const newCollection = await collectionRepo.createCollection(collection);

    if (!newCollection) {
        return Promise.reject(new Error('createCollection error'));
    }

    if (data.locations) {
        let locations: Location[] = [];

        locations = await Promise.all(
            data.locations.map((loc: Location) =>
                locationRepo.createLocation({ ...loc, wanderlist_id: newCollection.id })
            )
        );

        return { collection: newCollection, locations: [...locations] };
    }

    return { collection: newCollection };
}

export async function getCollectionById(data: { id: number }): Promise<Wanderlist> {
    const collection = await collectionRepo.getCollectionById(data);
    console.log('HUHHHHHH', data);
    if (!collection) {
        return Promise.reject(new Error('getCollectionById error'));
    }

    const locations = await locationRepo.getLocationsByCollectionId(data);

    if (locations.length) {
        return { collection, locations };
    }

    return { collection };
}

export async function updateCollection(data: CollectionUpdateReq): Promise<Wanderlist> {
    const { collection } = data;
    const updatedCollection = await collectionRepo.updateCollection(collection);

    if (!updatedCollection) {
        return Promise.reject(new Error('updateCollection error'));
    }

    if (data.locations) {
        let locations: Location[] = [];

        locations = await Promise.all(
            data.locations.map((loc: Location) => {
                if (loc.id) {
                    return locationRepo.updateLocation({ ...loc, wanderlist_id: collection.id });
                }

                return locationRepo.createLocation({ ...loc, wanderlist_id: collection.id });
            })
        );

        if (locations.length) {
            return { collection: updatedCollection, locations };
        }
    }

    return { collection: updatedCollection };
}

export async function deleteCollection(data: { id: number }): Promise<number> {
    await locationRepo.deleteLocationByCollectionId({ id: data.id });

    const id = await collectionRepo.deleteCollection(data);

    if (!id) {
        return Promise.reject(new Error('deleteCollection error'));
    }

    return id;
}
