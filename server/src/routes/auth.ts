import { Router } from 'express';
import passport from 'passport';

const authRouter = Router();

authRouter.post('/signup', async (req, res, next) => {
    passport.authenticate(
        'signup',
        { session: true, failureRedirect: '/', failureMessage: true },
        async (err, user) => {
            try {
                if (err) {
                    return res.status(401).send('signup error');
                }

                return res.status(201).json(user);
            } catch (error) {
                return next(error);
            }
        }
    )(req, res, next);
});

authRouter.post('/login', async (req, res, next) => {
    passport.authenticate(
        'login',
        { session: true, failureRedirect: '/', failureMessage: true },
        async (err, user) => {
            try {
                if (err || !user) {
                    console.log('err here', err);
                    return res.status(401).send('login error');
                }

                return res.status(200).json(user);
            } catch (error) {
                return next(error);
            }
        }
    )(req, res, next);
});

export { authRouter };
