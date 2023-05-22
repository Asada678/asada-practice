import { Schema } from "mongoose";

export type User = {
  email: string;
  username: string;
  _id?: string;
  image: string;
};
