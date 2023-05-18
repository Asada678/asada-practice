export type Prompt = {
  prompt: string;
  tag: string;
  userId?: string;
  _id?: string;
  creator: {
    image: string;
    username: string;
    email: string;
  };
};
