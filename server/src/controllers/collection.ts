import { Response, NextFunction } from 'express';
import * as collectionService from '../service/collection';
import { CollectionRequest } from '../models';

export async function createCollection(
    req: CollectionRequest,
    res: Response,
    next: NextFunction
): Promise<any> {
    try {
        const data = await collectionService.createCollection(req.body);
        return res.status(201).json({ data });
    } catch (err) {
        return next(err);
    }
}

export async function getCollectionById(
    req: CollectionRequest,
    res: Response,
    next: NextFunction
): Promise<any> {
    const { id } = req.params;

    try {
        const data = await collectionService.getCollectionById({ id: Number(id) });

        return res.status(200).json({ data });
    } catch (err) {
        return next(err);
    }
}

export async function updateCollection(
    req: CollectionRequest,
    res: Response,
    next: NextFunction
): Promise<any> {
    try {
        const data = await collectionService.updateCollection(req.body);
        return res.status(201).json({ data });
    } catch (err) {
        return next(err);
    }
}

export async function deleteCollection(
    req: CollectionRequest,
    res: Response,
    next: NextFunction
): Promise<any> {
    const { id } = req.params;

    try {
        const collectionId = await collectionService.deleteCollection({ id: Number(id) });
        return res.status(200).json({
            data: {
                message: 'Wanderlist deleted',
                id: collectionId
            }
        });
    } catch (err) {
        return next(err);
    }
}
