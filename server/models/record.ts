import * as mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';
import { IRecord } from '../interfaces/record.interface';

export interface IRecordModel extends IRecord, Document {}

export const RecordSchema: Schema = new Schema({
  id: Number,
  value: Number,
  date: Date,
  saved: Boolean
}, { versionKey: false });

export const Record = mongoose.model<IRecordModel>('Record', RecordSchema, 'records');
