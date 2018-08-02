import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
(<any>mongoose).Promise = global.Promise;

export type UserModel = mongoose.Document & {
  email: string,
  name: string,
  gender: string,
  password: string,
  registrationDate: string,
  comparePassword: (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void
};

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    dropDups: true,
    trim: true
  },
  name: String,
  gender: String,
  password: String,
  registrationDate: Date,
}, { versionKey: false });

// Password hash middleware.
userSchema.pre('save', function save(next) {
  const user: any = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) { return next(error); }
      user.password = hash;
      next();
    });
  });
});

// userSchema.pre('save', function(next) {
//   if (!this.registrationDate) {
//       this.registrationDate = new Date();
//   }
//   next();
// });

// Helper method for validating user's password.
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};
const NewUser = mongoose.model('User', userSchema, 'users');
export default NewUser;
