import { Router } from 'express';
import { verifyToken, isAdmin } from '../middleware/authMiddleware';
import { getEquipments, getEquipmentById, addEquipment, updateEquipment, deleteEquipment } from '../controllers/equipmentController';

const router = Router();

// Solo usuarios autenticados pueden acceder
router.get('/', verifyToken, getEquipments);
router.get('/:id', verifyToken, getEquipmentById);


router.post('/', verifyToken, isAdmin, addEquipment);
router.put('/:id', verifyToken, isAdmin, updateEquipment);
router.delete('/:id', verifyToken, isAdmin, deleteEquipment);

export default router;


