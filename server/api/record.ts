import { Request, Response } from 'express';
import { Record } from '../models/record';

export const getRecords = (req: Request, res: Response) => {
  console.log('getRecords() invoked');
  Record.find({})
    .exec((err, records) => {
      if (err) {
        console.log('Error retrieving records!');
        res.status(404).send('Not Found!');
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(records, null, 2));
      }
    });
};

export const getRecordById = (req: Request, res: Response) => {
  console.log('getRecordById() invoked');
  Record.findOne({ id: req.params.recordID })
  .exec((err, record) => {
    if (err) {
      console.log('Error retrieving record!');
      res.status(404).send('Not Found!');
    } else {
      res.setHeader('Content-Type', 'application/json');
      // res.status(200).send(JSON.stringify(record, null, 2));
      res.status(200).send(record);
    }
  });
};
