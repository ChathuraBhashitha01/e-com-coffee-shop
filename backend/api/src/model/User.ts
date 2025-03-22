import mongoose, { Schema, Document } from 'mongoose';

interface User extends Document {
    userName: string;
    name: string;
    role: string
    password: string;
}

const userSchema: Schema = new Schema(
    {
        userName: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
        },
        role: {
            type: String,
        },
        password: {
            type: String,
            required: true
        }
    },
    { versionKey: false }
);

const User = mongoose.model<User>('User', userSchema);

export default User;
