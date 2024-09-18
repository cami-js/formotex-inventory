import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

interface JwtPayload {
  userId: string;
  role: string;
}

interface CustomRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado, se requiere un token' });
    }

    try {
        const payload = jwt.verify(token, config.JWT_SECRET) as JwtPayload;
        req.user = { id: payload.userId, role: payload.role };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
};

export const isAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado, no tienes el rol adecuado' });
    }
    next();
};



