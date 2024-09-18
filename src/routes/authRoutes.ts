import { Router } from 'express';
import { check } from 'express-validator';
import { login, register } from '../controllers/authController';

const router = Router();

// Registro 
router.post(
    '/register',
    [
        check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    ],
    register
);

// Inicio de sesión
router.post(
    '/login',
    [
        check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
    ],
    login
);

export default router;

