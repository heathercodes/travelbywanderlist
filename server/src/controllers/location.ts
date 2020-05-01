// const { validationResult } = require('express-validator/check');
import { Response } from 'express';
import * as locationService from '../service/location';
// const { NotFoundError } = require('../../utils/errors');

export async function getLocationById(req, res): Response {
    const { id } = req.params;

    try {
        const data = await locationService.getLocationById({ id });

        return res.status(200).json({ data });
    } catch (error) {
        return res.status(422).json({ error });
    }
}

export async function updateLocation(req, res): Response {
    const { id } = req.params;

    try {
        const data = await locationService.updateLocation({ id, ...req.body });

        return res.status(200).json({ data });
    } catch (error) {
        return res.status(422).json({ error });
    }
}

export async function deleteLocationById(req, res): Response {
    const { id } = req.params;

    try {
        await locationService.deleteLocationById({ id });

        return res.status(200).json({ data: 'Location deleted' });
    } catch (error) {
        return res.status(422).json({ error });
    }
}

export async function createLocation(req, res): Response {
    const { name, lat, lng } = req.body;

    try {
        await locationService.createLocation({ name, lat, lng });

        return res.status(200).json({ data: 'Location created' });
    } catch (error) {
        return res.status(422).json({ error });
    }
}
