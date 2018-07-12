import * as passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as uuid from 'uuid/v4';
import { default as NewUser, UserModel } from '../models/User';
import AUTH_CONFIG from '../constants/auth_config';
import * as bcrypt from 'bcryptjs';

// * GET /login  * Login page.
export const getLogin = (req: Request, res: Response) => {
  if (req.user) {
    return res.redirect('/');
  }
  console.log('getLogin...');
  res.json({msg: `It's a login page`});
};

// * GET /profile  * Signup page.
export const getProfile = (req: Request, res: Response) => {
  if (req.user) {
    return res.redirect('/');
  }
  console.log('getProfile...');
  res.json({msg: `It's a profile page`});
};

// * GET User byId.
export const getUserDataById = (req: Request, res: Response) => {
  NewUser.findById(req.params.id, (err, existingUser) => {
    if (err) { return err; }
    if (existingUser) {
      console.log('user found');
      res.json({ user: existingUser });
    }
  });
};

// * DELETE User byId.
export const deleteUserById = (req: Request, res: Response) => {
  NewUser.findById(req.params.id, (err, existingUser) => {
    if (err) { return err; }
    if (existingUser) {
      existingUser.remove();
      res.json({ msg: 'removed' });
    }
  });
};

// *Update  User.
export const updateUserData = (req: Request, res: Response) => {
  console.log('request body', req.body);
  console.log('request params', req.params.id);

  if (req.body.hasOwnProperty('password')) {
    bcrypt.genSalt(10, (errr, salt) => {
      if (errr) { return (errr); }
      bcrypt.hash( req.body.password, salt, (error, hash) => {
        if (error) { return (error); }
        req.body.password = hash;
        NewUser.update({_id: req.params.id}, req.body, (err, existingUser) => {
          if (err) { return err; }
          if (existingUser) {
            console.log('user found', existingUser);
            res.json(existingUser);
          }
        });
      });
    });
  } else {
    NewUser.update({_id: req.params.id}, req.body, (err, existingUser) => {
      if (err) { return err; }
      if (existingUser) {
        console.log('user found', existingUser);
        res.json(existingUser);
      }
    });
  }
};

// * POST /login  * Sign in using email and password.
export const postLogin = (req: Request, res: Response, next: NextFunction) => {
  console.log('postLogin body is ', req.body);
  // console.log('postLogin sessionID is', req.sessionID);
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  // const errors = req.validationErrors();

  // if (errors) {
  //   console.log('postLogin errors are', errors);
  //   return res.json({ status: 'error', msg: 'Invalid email' });
  // }

  passport.authenticate('local', (err: Error, user: UserModel) => {
    if (err) { return next(err); }
    if (!user) {
      return res.json({ status: 'error', msg: 'Invalid password' });
    }
    req.logIn(user, (error) => {
      if (error) { return next(error); }
      console.log('Success! user is ...', user);
      // console.log('Success! req.session is ...', req.sessionID);
      const refreshToken = uuid();
      const token = jwt.sign({ name: user.name, email: user.email },
        AUTH_CONFIG.jwt_secret, { expiresIn: 1000 });
      console.log('Success! You are logged in. tocken is ', token);
      res.json({ status: 'success', token, refreshToken, id: user._id, name: user.name });
    });
  })(req, res, next);
};

// * GET /logout   * Log out.
export const logout = (req: Request, res: Response) => {
  req.logout();
  res.redirect('/');
};

// * GET /signup  * Signup page.
export const getSignup = (req: Request, res: Response) => {
  if (req.user) {
    return res.redirect('/');
  }
  console.log('getSignup...');
  res.json({msg: `It's a registration page`});
};

// * POST /signup  * Create a new local account.
export const postSignup = (req: Request, res: Response, next: NextFunction) => {
  console.log('postSignup body is ', req.body);
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password must be at least 4 characters long').len({ min: 4 });
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
  req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    console.log('errors', errors);
    return res.json({ status: 'error', msg: errors });
  }

  const user = new NewUser({
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    password: req.body.password,
  });

  NewUser.findOne({$or: [{email: req.body.email}, {mobile: req.body.mobile}]}, (err, existingUser: UserModel) => {
    if (err) { return next(err); }
    if (existingUser) {
    if (existingUser.email === req.body.email) {
      console.log('Account with that email address already exists.');
      return res.json({ status: 'error', msg: 'Account with that email address already exists.' });
    } else if (existingUser.mobile === parseInt(req.body.mobile, 10)) {
      console.log('Account with that mobile number already exists.');
      return res.json({ status: 'error', msg: 'Account with that mobile number already exists.' });
    }
  }
    user.save((error) => {
      if (error) { return next(error); }
      req.logIn(user, (Err) => {
        if (Err) {
          return next(Err);
        }
        res.json({ status: 'success', msg: 'Registration Successful.' });
      });
    });
  });
};
