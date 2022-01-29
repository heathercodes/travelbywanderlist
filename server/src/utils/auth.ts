import config from '../../knexfile';
import { User } from '../models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export function newToken(user: { id: number }): User {
    return jwt.sign({ id: user.id }, config.secrets.jwt, {
        expiresIn: config.secrets.jwtExp
    });
}

export function verifyToken(token: any): Promise<string> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.secrets.jwt, (err, payload) => {
            if (err) return reject(err);
            resolve(payload);
        });
    });
}

export function checkPassword(password): string {
    const passwordHash = this.password;
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, (err, same) => {
            if (err) {
                return reject(err);
            }

            resolve(same);
        });
    });
}
