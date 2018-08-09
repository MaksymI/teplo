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

export const getUserById = (req: Request, res: Response) => {
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

export const updateUserById = (req: Request, res: Response) => {
  console.log('updateUserById() invoked');
  NewUser.update({ _id: req.params.userID }, req.body)
  .exec((err, user) => {
    if (err) {
      console.log('Error updating user!');
      res.status(404).send('Not Found!');
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(user);
    }
  });
};

export const createUser = (req: Request, res: Response) => {
  console.log('createUser() invoked');
  console.log('req.body ', req.body);
  NewUser.create(req.body)
  .then(user => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(user);
  })
  .catch(err => {
      console.log(err);
      res.status(404).send(`Unable to create user! ${err}`);
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
