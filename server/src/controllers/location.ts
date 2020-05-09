// const { validationResult } = require('express-validator/check');
import { Response } from 'express';
import * as locationService from '../service/location';
import { LocationRequest } from '../models';
// const { NotFoundError } = require('../../utils/errors');

export async function getLocationById(req: LocationRequest, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
        const data = await locationService.getLocationById({ id: Number(id) });

        return res.status(200).json({ data });
    } catch (error) {
        return res.status(422).json({ error });
    }
}

export async function updateLocation(req: LocationRequest, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
        const data = await locationService.updateLocation({ id: Number(id), ...req.body });

        return res.status(200).json({ data });
    } catch (error) {
        return res.status(422).json({ error });
    }
}

export async function deleteLocationById(req: LocationRequest, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
        await locationService.deleteLocationById({ id: Number(id) });

        return res.status(200).json({ data: 'Location deleted' });
    } catch (error) {
        return res.status(422).json({ error });
    }
}

export async function createLocation(req: LocationRequest, res: Response): Promise<Response> {
    const { name, latitude, longitude } = req.body;

    try {
        await locationService.createLocation({ name, latitude, longitude });

        return res.status(200).json({ data: 'Location created' });
    } catch (error) {
        return res.status(422).json({ error });
    }
}
