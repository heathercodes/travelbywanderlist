import * as collectionService from '../service/collection';
// const { NotFoundError } = require('../../utils/errors');

export async function createCollection(req, res) {
    try {
        const ok = await collectionService.createCollection(req.body)

        if (ok) {
            return res.status(200).json({ data: 'Wanderlist created' });
        }
    } catch(error) {
        return res.status(422).json({ error })
    }
};

export async function getCollectionById(req, res) {
    const { id } = req.params;

    try {
        const data = await collectionService.getCollectionById({ id })

        if (data) {
            return res.status(200).json({ data });
        }
    } catch(error) {
        return res.status(422).json({ error })
    }
};

export async function updateCollection(req, res) {
    try {
        const data = await collectionService.updateCollection(req.body)

        if (data) {
            return res.status(200).json({ data });
        }
    } catch(error) {
        return res.status(422).json({ error })
    }
};

export async function deleteCollection(req, res) {
    const { id } = req.params;

    try {
        const ok = await collectionService.deleteCollection({ id })

        if (ok) {
            return res.status(200).json({ data: 'Wanderlist deleted' });
        }
    } catch(error) {
        return res.status(422).json({ error })
    }
};
