import { Request, Response } from 'express';
import { Record } from '../models/record';

export const getRecords = (req: Request, res: Response) => {
  Record.find({})
    .exec((err, records) => {
      if (err) {
        console.log('Error retrieving cafes');
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(records, null, 2));
      }
    });
};

export const getRecordById = (req: Request, res: Response) => {
  Record.find({ _id: {$in: req.params.recordId.split(',')} })
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send('Not Found!');
      }
    })
    .catch((error) => console.log(error));
};

