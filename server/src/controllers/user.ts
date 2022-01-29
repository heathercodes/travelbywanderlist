import { Response, NextFunction } from 'express';
import * as userService from '../service/user';
import { UserRequest } from '../models';
import { newToken } from '../utils/auth';
import { checkPassword } from '../utils/auth';

export async function createUser(
    req: UserRequest,
    res: Response,
    next: NextFunction
): Promise<any> {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'need email and password' });
    }

    try {
        const user = await userService.createUser(req.body);
        const token = newToken(user);
        return res.status(201).send({ token });
    } catch (err) {
        console.error(err);
        // return res.status(500).end();
        return next(err);
    }
}

export async function getUser(req: UserRequest, res: Response, next: NextFunction): Promise<any> {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'need email and password' });
    }

    const invalid = { message: 'Invalid email and passoword combination' };

    try {
        const user = await userService.getUser({ email: req.body.email });

        if (!user) {
            return res.status(401).send(invalid);
        }

        const match = await checkPassword(req.body.password);

        if (!match) {
            return res.status(401).send(invalid);
        }

        const token = newToken(user);
        return res.status(201).send({ token });
    } catch (err) {
        console.error(err);
        return next(err);
    }
}

// TODO
// export async function protect(
//     req: CollectionRequest,
//     res: Response,
//     next: NextFunction
// ): Promise<any> {
//     const bearer = req.headers.authorization;

//     if (!bearer || !bearer.startsWith('Bearer ')) {
//         return res.status(401).end();
//     }

//     const token = bearer.split('Bearer ')[1].trim();
//     let payload;
//     try {
//         payload = await verifyToken(token);
//     } catch (e) {
//         return res.status(401).end();
//     }

//     // TODO
//     const user = await User.findById(payload.id).select('-password').lean().exec();

//     if (!user) {
//         return res.status(401).end();
//     }

//     req.user = user;
//     next();
// }
