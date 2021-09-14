import { model, Schema, Document, Types } from 'mongoose';

interface IRegistration extends Document {
  match: Types.ObjectId;
  user: Types.ObjectId;
}

const RegistrationSchema: Schema = new Schema({
  match: {
    type: Types.ObjectId,
    ref: 'Match',
    require: true,
  },
  user: {
    type: Types.ObjectId,
    ref: 'User',
    require: true,
  }
}, {
  timestamps: true,
});


export default model<IRegistration>('registration', RegistrationSchema);