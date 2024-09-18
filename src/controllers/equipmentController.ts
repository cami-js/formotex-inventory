import { Request, Response } from 'express';
import Equipment from '../models/equipment';

// Obtener todos los equipos
export const getEquipments = async (req: Request, res: Response): Promise<Response> => {
  try {
    const equipments = await Equipment.find();
    return res.json(equipments);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener los equipos', error });
  }
};

// Obtener un equipo por ID
export const getEquipmentById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) {
      return res.status(404).json({ message: 'Equipo no encontrado' });
    }
    return res.json(equipment);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el equipo', error });
  }
};

// Agregar un nuevo equipo
export const addEquipment = async (req: Request, res: Response): Promise<Response> => {
  try {
    const newEquipment = new Equipment(req.body);
    const savedEquipment = await newEquipment.save();
    return res.status(201).json(savedEquipment);
  } catch (error) {
    return res.status(500).json({ message: 'Error al agregar el equipo', error });
  }
};

// Actualizar un equipo
export const updateEquipment = async (req: Request, res: Response): Promise<Response> => {
  try {
    const updatedEquipment = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEquipment) {
      return res.status(404).json({ message: 'Equipo no encontrado' });
    }
    return res.json(updatedEquipment);
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar el equipo', error });
  }
};

// Eliminar un equipo
export const deleteEquipment = async (req: Request, res: Response): Promise<Response> => {
  try {
    const deletedEquipment = await Equipment.findByIdAndDelete(req.params.id);
    if (!deletedEquipment) {
      return res.status(404).json({ message: 'Equipo no encontrado' });
    }
    return res.json({ message: 'Equipo eliminado con éxito' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el equipo', error });
  }
};

