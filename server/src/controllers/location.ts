// const { validationResult } = require('express-validator/check');
import * as locationService from '../service/location';
// const { NotFoundError } = require('../../utils/errors');

export async function getLocationById(req, res) {
    const { id } = req.params;

    try {
        const data = await locationService.getLocationById({ id })

        if (data) {
            return res.status(200).json({ data });
        }
    } catch(error) {
        return res.status(422).json({ error })
    }
};

export async function updateLocation(req, res) {
    const { id } = req.params;

    try {
        const data = await locationService.updateLocation({ id, details: req.body })

        if (data) {
            return res.status(200).json({ data });
        }
    } catch(error) {
        return res.status(422).json({ error })
    }
};

export async function deleteLocation(req, res) {
    const { id } = req.params;

    try {
        const ok = await locationService.deleteLocation({ id })

        if (ok) {
            return res.status(200).json({ data: 'Location deleted' });
        }
    } catch(error) {
        return res.status(422).json({ error })
    }
};

export async function createLocation(req, res) {
    const { name, lat, lng } = req.body;

    try {
        const ok = await locationService.createLocation({ name, lat, lng })

        if (ok) {
            return res.status(200).json({ data: 'Location created' });
        }
    } catch(error) {
        return res.status(422).json({ error })
    }
};
