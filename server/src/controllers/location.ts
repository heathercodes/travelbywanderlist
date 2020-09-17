import { Response } from 'express';
import * as locationService from '../service/location';
import { LocationRequest } from '../models';

export async function getLocationById(req: LocationRequest, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
        const data = await locationService.getLocationById({ id: Number(id) });

        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export async function updateLocation(req: LocationRequest, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
        const data = await locationService.updateLocation({ id: Number(id), ...req.body });

        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export async function deleteLocationById(req: LocationRequest, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
        const locationId = await locationService.deleteLocationById({ id: Number(id) });

        return res.status(200).json({
            data: {
                message: 'Location deleted',
                id: locationId
            }
        });
    } catch (error) {
        return res.status(422).json({ error });
    }
}

export async function createLocation(req: LocationRequest, res: Response): Promise<Response> {
    try {
        const data = await locationService.createLocation(req.body);

        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json({ error });
    }
}
