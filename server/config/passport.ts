import * as passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import * as passportLocal from 'passport-local';
import * as _ from 'lodash';
import { default as User } from '../models/User';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user, done) => {
  done(undefined, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Sign in using Email and Password.
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email.toLowerCase() }, (err, user: any) => {
    if (err) { return done(err); }
    if (!user) {
      return done(undefined, false, { message: `Email ${email} not found.` });
    }
    user.comparePassword(password, (error: Error, isMatch: boolean) => {
      if (error) { return done(error); }
      if (isMatch) {
        return done(undefined, user);
      }
      return done(undefined, false, { message: 'Invalid email or password.' });
    });
  });
}));

// Login Required middleware.
export let isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

// Authorization Required middleware.
export let isAuthorized = (req: Request, res: Response, next: NextFunction) => {
  const provider = req.path.split('/').slice(-1)[0];

  if (_.find(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};
