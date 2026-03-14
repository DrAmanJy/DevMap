import mongoose, { HydratedDocument, Schema, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from '@DevMap/shared';

interface UserMethods {
  comparePassword(password: string): Promise<boolean>;
}

export type UserDocument = HydratedDocument<User, {}, UserMethods>;

type UserModelType = Model<User, {}, UserMethods>;

const userSchema = new Schema<User, UserModelType, UserMethods>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 16,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['owner', 'admin', 'user'],
      default: 'user',
    },
    avatar: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpiresAt: {
      type: Date,
      default: null,
    },
    otpAttempts: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    resendOTPAt: {
      type: Date,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    virtuals: true,
    toJSON: {
      transform: (doc, ret) => {
        const plain = ret as any;
        delete plain._id;
        delete plain.password;
        delete plain.otp;
        delete plain.refreshToken;
        return plain;
      },
    },
    toObject: {
      transform: (doc, ret) => {
        const plain = ret as any;
        delete plain._id;
        return plain;
      },
    },
  },
);

userSchema.pre('save', async function (this: UserDocument) {
  if (this.isModified('password')) {
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
});

userSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const UserModel =
  (mongoose.models.User as UserModelType) ||
  mongoose.model<User, UserModelType>('User', userSchema);

export default UserModel;
