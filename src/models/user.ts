import { model, Schema, Document } from 'mongoose';
import process from 'process'
import bcrypt from 'bcrypt';


interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: false,
  },
  self: {
    type: String,
    require: false,
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
}, {
  timestamps: true,
});

UserSchema.pre<IUser>('save', function (this: IUser, next): void {
  if (this.password && process.env.SALTROUNDS) {
    this.password = bcrypt.hashSync(this.password, Number(process.env.SALTROUNDS));
  }
  next();
});

export default model<IUser>('user', UserSchema);