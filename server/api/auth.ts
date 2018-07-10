import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import AUTH_CONFIG from '../constants/auth_config';

export const verifyToken =  (req: Request, res: Response, next: NextFunction) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, AUTH_CONFIG.jwt_secret, (err, decoded) => {
            if (err) {
                return res.json({ 'error': true });
            }
            req['decoded'] = decoded;
            next();
        });
    } else {
        return res.status(403).send({ 'error': true });
    }
};
