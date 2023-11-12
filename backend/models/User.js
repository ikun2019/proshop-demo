const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  }
}, {
  timestamps: true,
});

// * データベースに保存する前にパスワードを暗号化するメソッド
userSchema.pre('save', async function (next) {
  // passwordが変更されていない場合は無視する
  if (!this.isModified('password')) {
    next();
  };
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (enteredPassowrd) {
  return await bcrypt.compare(enteredPassowrd, this.password);
};

userSchema.statics.getJwtToken = function (res, user) {
  const token = jwt.sign({
    userId: user._id,
  },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 1000 //30d
  });
}

const User = mongoose.model('User', userSchema);

module.exports = User;