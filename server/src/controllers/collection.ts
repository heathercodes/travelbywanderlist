import { Response } from 'express';
import * as collectionService from '../service/collection';
// const { NotFoundError } = require('../../utils/errors');

export async function createCollection(req, res): Promise<Response> {
    try {
        const collectionId = await collectionService.createCollection(req.body);

        return res.status(200).json({ data: `Wanderlist created ${collectionId}` });
    } catch (error) {
        return res.status(422).json({ error });
    }
}

export async function getCollectionById(req, res): Promise<Response> {
    const { id } = req.params;

    try {
        const data = await collectionService.getCollectionById({ id });

        return res.status(200).json({ data });
    } catch (error) {
        return res.status(422).json({ error });
    }
}

export async function updateCollection(req, res): Promise<Response> {
    try {
        const data = await collectionService.updateCollection(req.body);

        return res.status(200).json({ data });
    } catch (error) {
        return res.status(422).json({ error });
    }
}

export async function deleteCollection(req, res): Promise<Response> {
    const { id } = req.params;

    try {
        const collectionId = await collectionService.deleteCollection({ id });

        return res.status(200).json({ data: `Wanderlist deleted ${collectionId}` });
    } catch (error) {
        return res.status(422).json({ error });
    }
}
