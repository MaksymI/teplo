import { Request, Response } from 'express';
import { Record } from '../models/record';
import { default as NewUser, UserModel } from '../models/User';

export const getUsers = (req: Request, res: Response) => {
  console.log('getUsers() invoked');
  NewUser.find({})
    .exec((err, users) => {
      if (err) {
        console.log('Error retrieving users!');
        res.status(404).send('Not Found!');
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(users, null, 2));
      }
    });
};

export const getUsersById = (req: Request, res: Response) => {
  console.log('getUsersById() invoked');
  NewUser.findById(req.params.userID)
  .exec((err, user) => {
    if (err) {
      console.log('Error retrieving user!');
      res.status(404).send('Not Found!');
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(user);
    }
  });
};

export const updateRecordById = (req: Request, res: Response) => {
  console.log('updateRecordById() invoked');
  Record.update({ _id: req.params.recordID }, req.body)
  .exec((err, record) => {
    if (err) {
      console.log('Error updating record!');
      res.status(404).send('Not Found!');
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(record);
    }
  });
};

export const createRecord = (req: Request, res: Response) => {
  console.log('createRecord() invoked');
  Record.create(req.body)
  .then(record => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(record);
  })
  .catch(err => {
      console.log(err);
      res.status(404).send('Unable to create record!');
  });
};

export const deleteRecordById = (req: Request, res: Response) => {
  console.log('deleteRecordById() invoked');
  Record.findByIdAndRemove(req.params.recordID)
  .exec((err, record) => {
    if (err) {
      console.log('Error deleting record!');
      res.status(404).send('Not Found!');
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(record);
    }
  });
};
