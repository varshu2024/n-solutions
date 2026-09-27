import mongoose from 'mongoose';

const loginOtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true
    },

    otpHash: {
      type: String,
      required: true
    },

    expiresAt: {
    type: Date,
    required: true
    },

    attempts: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Automatically remove expired OTP records.
loginOtpSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

export const LoginOtp = mongoose.model('LoginOtp', loginOtpSchema);