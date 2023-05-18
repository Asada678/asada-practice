import { model, models, Schema } from "mongoose";

interface IUser {
  email: string;
  username: string;
  image: string;
  id: string;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
  },
  image: {
    type: String,
  },
  id: {
    type: String,
  },
});

const User = models.User || model<IUser>("User", UserSchema);

export default User;
