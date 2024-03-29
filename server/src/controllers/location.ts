import { Response, NextFunction } from 'express';
import * as locationService from '../service/location';
import { LocationRequest } from '../models';

export async function getLocationById(
    req: LocationRequest,
    res: Response,
    next: NextFunction
): Promise<any> {
    const { id } = req.params;

    try {
        const data = await locationService.getLocationById({ id: Number(id) });
        return res.status(200).json({ data });
    } catch (err) {
        return next(err);
    }
}

export async function updateLocation(
    req: LocationRequest,
    res: Response,
    next: NextFunction
): Promise<any> {
    const { id } = req.params;

    try {
        const data = await locationService.updateLocation({ ...req.body, id: Number(id) });
        return res.status(201).json({ data });
    } catch (err) {
        return next(err);
    }
}

export async function deleteLocationById(
    req: LocationRequest,
    res: Response,
    next: NextFunction
): Promise<any> {
    const { id } = req.params;

    try {
        const locationId = await locationService.deleteLocationById({ id: Number(id) });
        return res.status(200).json({
            data: {
                message: 'Location deleted',
                id: locationId
            }
        });
    } catch (err) {
        return next(err);
    }
}

export async function createLocation(
    req: LocationRequest,
    res: Response,
    next: NextFunction
): Promise<any> {
    try {
        const data = await locationService.createLocation(req.body);
        return res.status(201).json({ data });
    } catch (err) {
        return next(err);
    }
}
