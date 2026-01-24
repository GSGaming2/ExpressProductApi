import mongoose from "mongoose";
import type { Role } from "../constants/roles.ts";
import bcrypt from 'bcrypt'


export interface User {
    name: string;
    email: string;
    password: string;
    role: Role;
    refreshToken?: string | null
}

const UserSchema = new mongoose.Schema<User>({
    name: {
        type: String,
        required: [true, 'User name is required']
    },
    email: {
        type: String,
        required: [true, 'User email is required']
    },
    password: {
        type: String,
        required: [true, 'User password is required']
    },
    role:{
        type: String,
        required: [true, 'User role is required']
    },
    refreshToken: {
        type: String,
        default: null,
        required: false
    }
},
{
    timestamps: true
}
);
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model<User>('Users', UserSchema);