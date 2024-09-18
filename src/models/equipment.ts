import { Schema, model, Document } from 'mongoose';

interface IEquipment extends Document {
  name: string;
  description: string;
  status: string;
  location: string;
  acquisitionDate: Date;
}

const EquipmentSchema = new Schema<IEquipment>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  location: { type: String, required: true },
  acquisitionDate: { type: Date, required: true },
});

export default model<IEquipment>('Equipment', EquipmentSchema);

