import { Schema, Document, Types } from 'mongoose';

export interface StudentData extends Document {
  _id: Types.ObjectId;
  bookName: string;
  authorName: string;
  imageurl: string;
  read:String;
}

export const StudentSchema = new Schema<StudentData>({
  id: {  type: Types.ObjectId, default: Types.ObjectId, required: true},
  bookName: { type: String,},
  authorName: { type: String, },
  imageurl: { type: String },
  read: { type: String },
});
