/// <reference types="node" />
// Get dependencies
import * as express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as passport from 'passport';
import * as expressValidator from 'express-validator';
import * as lusca from 'lusca';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as errorHandler from 'errorhandler';
import * as compression from 'compression';
(<any>mongoose).Promise = global.Promise;

import DATABASE_CONFIG from './constants/database_config';
import * as userController from './api/user';
import { verifyToken } from './api/auth';

// Create Express server
const app = express();

// Connect to MongoDB
mongoose.connect(DATABASE_CONFIG.DATABASE_CLOUD, { useNewUrlParser: true });
mongoose.connection.on('error', () => {
  console.log('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

const options: cors.CorsOptions = {
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: false
};
app.use(cors(options));

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator());

app.use(passport.initialize());
app.use(passport.session());

app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use(compression({
  level: 9,
}));
// Point static path to dist
app.use(express.static(path.join(__dirname), { maxAge: 31557600000 }));

// Primary app routes.
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', verifyToken, userController.logout);
app.get('/register', userController.getSignup);
app.post('/register', userController.postSignup);
app.get('/profile/:id', userController.getUserDataById);
app.put('/profile/:id', userController.updateUserData);

app.get('/profile', userController.getProfile);
app.get('/profile/:id', userController.getUserDataById);
app.put('/profile/:id', userController.updateUserData);
app.delete('/profile/:id', userController.deleteUserById);


app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname) + '/index.html');
});

// Error Handler.
app.use(errorHandler());

// Get port from environment and store in Express.
app.set('port', DATABASE_CONFIG.PORT || 3000);

// Listen on provided port, on all network interfaces.
app.listen(app.get('port'), () => {
  console.log(('  App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});