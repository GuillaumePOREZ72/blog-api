import { Schema, model, Types } from 'mongoose';

/**
 * Token interface
 */
interface IToken {
  token: string;
  userId: Types.ObjectId;
}

/**
 * Token schema
 */
const tokenSchema = new Schema<IToken>({
  token: {
    type: String,
    require: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
});

export default model<IToken>('Token', tokenSchema);
