import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';

// Registrar nuevo usuario
export const register = async (req: Request, res: Response) => {
  const { username, password, role } = req.body;

  try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
          return res.status(400).json({ message: 'El usuario ya existe' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
          username,
          password: hashedPassword,
          role
      });

      await newUser.save();
      res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
      res.status(500).json({ message: 'Error en el registro del usuario' });
  }
};

// Inicio de sesión y generación de token
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
      const user = await User.findOne({ username });
      if (!user) {
          return res.status(400).json({ message: 'Credenciales inválidas' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Credenciales inválidas' });
      }

      const token = jwt.sign({ userId: user._id, role: user.role }, config.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token });
  } catch (error) {
      res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};