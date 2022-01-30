import { secret } from '../db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as userService from '../service/user';

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local'); // eslint-disable-line

// secure Routes
// function verifyToken(token: any): Promise<any> {
//     return new Promise((resolve, reject) => {
//         jwt.verify(token, secret, (err: any, payload: any): void => {
//             if (err) return reject(err);
//             resolve(payload);
//         });
//     });
// }

// export const protect = async (req: CollectionRequest, res: Response, next: NextFunction): void => {
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

//     const user = await User.findById(payload.id).select('-password').lean().exec();

//     if (!user) {
//         return res.status(401).end();
//     }

//     req.user = user;
//     next();
// };

function newToken(user: { id: number }): string {
    return jwt.sign({ id: user.id }, secret, {
        expiresIn: '100d'
    });
}

function checkPassword(currentPassword: string, dbPassword: string): Promise<any> {
    return new Promise((resolve, reject) => {
        bcrypt.compare(currentPassword, dbPassword, (err, same) => {
            if (err) {
                return reject(err);
            }

            resolve(same);
        });
    });
}

module.exports = function (passport: any): void {
    passport.use(
        'signup',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password'
            },
            async (email: string, password: string, done: any) => {
                if (!email || !password) {
                    return done(null, false, { message: 'need email and password' });
                }

                try {
                    const user = await userService.createUser({ email, password });
                    const token = newToken(user);

                    return done(null, { user, token });
                } catch (err) {
                    return done(err, false, { message: 'Invalid email or password.' });
                }
            }
        )
    );
    passport.use(
        'login',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password'
            },
            async (email: string, password: string, done: any) => {
                if (!email || !password) {
                    return done(null, false, { message: 'need email and password' });
                }

                const invalid = { message: 'Invalid email and password combination' };

                try {
                    const user = await userService.getUser({ email });

                    if (!user) {
                        return done(null, false, { message: invalid });
                    }

                    const match = await checkPassword(password, user.password);

                    if (!match) {
                        return done(null, false, { message: invalid });
                    }

                    const token = newToken(user);
                    return done(null, { user, token });
                } catch (err) {
                    return done(err, false, { message: 'Invalid email or password.' });
                }
            }
        )
    );

    passport.use(
        new JWTstrategy(
            {
                secretOrKey: 'TOP_SECRET',
                jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
            },
            async (token: any, done: any) => {
                try {
                    return done(null, token.user);
                } catch (error) {
                    done(error);
                }
            }
        )
    );
};
