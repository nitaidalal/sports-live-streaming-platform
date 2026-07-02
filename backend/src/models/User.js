import bcrypt from 'bcryptjs';
import { Schema, model } from 'mongoose';

const watchHistorySchema = new Schema(
    {
        matchId:{
            type:Schema.Types.ObjectId,
            ref:'Match',
            required:true
        },
        watchedAt:{
            type: Date,
            default: Date.now
        }
    },
    { _id: false }
)

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        minLength: [2, 'Full name must be at least 2 characters long'],
        maxLength: [50, 'Full name must be at most 50 characters long'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false,
    },
    avatar: {
        type: String,
        default: null,
    },
    favoriteTeams: {
        type: [String],
        default: [],
    },
    watchHistory: {
        type: [watchHistorySchema],
        default: [],
    }
}, {timestamps: true});

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return  bcrypt.compare(candidatePassword, this.password);
};

const User = model('User', userSchema);

export default User;


