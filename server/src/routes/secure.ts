import { Router } from 'express';

const secureRouter = Router();

secureRouter.get('/map/:id', (req, res, next) => {
    res.json({
        message: 'You made it to the secure route',
        user: req.user,
        token: req.query.secret_token
    });
    next();
});

export { secureRouter };
