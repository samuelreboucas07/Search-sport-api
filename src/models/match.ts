import { model, Schema, Document, Types } from 'mongoose';


type Location = {
  longitude: Number,
  latitude: Number,
}
interface IMatch extends Document {
  organizer: Types.ObjectId,
  score: Number,
  vacancy: Number,
  name: String,
  image: String,
  amount: Number,
  date: Date,
  location: Location,
}

const Location = new Schema({
  longitude: Number,
  latitude: Number,
});


const MatchSchema: Schema = new Schema({
  location:{
    type: Location,
    default: {},
    require: true,
  },
  organizer: {
    type: Types.ObjectId,
    require: true,
    ref: 'User',
  },
  score: {
    type: Number,
    require: false,
  },
  vacancy: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: false,
  },
  amount: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  }
}, {
  timestamps: true,
});

export default model<IMatch>('match', MatchSchema);