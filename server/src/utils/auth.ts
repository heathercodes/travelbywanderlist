import { secret } from '../db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export function newToken(user: { id: number }): string {
    return jwt.sign({ id: user.id }, secret, {
        expiresIn: '100d'
    });
}

export function verifyToken(token: any): Promise<any> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err: any, payload: any): void => {
            if (err) return reject(err);
            resolve(payload);
        });
    });
}

export function checkPassword(currentPassword: string, dbPassword: string): Promise<any> {
    return new Promise((resolve, reject) => {
        bcrypt.compare(currentPassword, dbPassword, (err, same) => {
            if (err) {
                return reject(err);
            }

            resolve(same);
        });
    });
}
