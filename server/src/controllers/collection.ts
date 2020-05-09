import { Response } from 'express';
import * as collectionService from '../service/collection';
import { CollectionRequest } from '../models';
// const { NotFoundError } = require('../../utils/errors');

export async function createCollection(req: CollectionRequest, res: Response): Promise<Response> {
    try {
        const data = await collectionService.createCollection(req.body);

        return res.status(200).json({ data });
    } catch (error) {
        return res.status(422).json({ error });
    }
}

export async function getCollectionById(req: CollectionRequest, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
        const data = await collectionService.getCollectionById({ id: Number(id) });

        return res.status(200).json({ data });
    } catch (error) {
        return res.status(422).json({ error });
    }
}

export async function updateCollection(req: CollectionRequest, res: Response): Promise<Response> {
    try {
        const data = await collectionService.updateCollection(req.body);

        return res.status(200).json({ data });
    } catch (error) {
        return res.status(422).json({ error });
    }
}

export async function deleteCollection(req: CollectionRequest, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
        const collectionId = await collectionService.deleteCollection({ id: Number(id) });

        return res.status(200).json({ data: `Wanderlist deleted ${collectionId}` });
    } catch (error) {
        return res.status(422).json({ error });
    }
}
