import { model, Schema } from 'mongoose';
import { UserStructure } from '../entities/users';

const userSchema = new Schema<UserStructure>({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  userName: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  players: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Players',
    },
  ],
});

userSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
    delete returnedObject.password;
  },
});

export const UserModel = model('User', userSchema, 'users');
