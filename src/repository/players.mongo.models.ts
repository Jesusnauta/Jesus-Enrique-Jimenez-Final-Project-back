import { Schema, model } from 'mongoose';
import { Players } from '../entities/players';

const playerSchema = new Schema<Players>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  position: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  preferredFoot: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

playerSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
  },
});

export const PlayersModel = model('Player', playerSchema, 'players');
