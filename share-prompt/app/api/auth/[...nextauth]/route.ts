import User from "@models/user";
import { connectToDB } from "@utils/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // const sessionUser = await User.findOne({
      //   email: session.user?.email,
      // });
      const sessionUser = { _id: "" };

      if (!sessionUser) {
        return session;
      }

      if (session.user !== undefined) {
        session.user.id = sessionUser._id.toString();
      }

      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      try {
        await connectToDB();

        // check if a user already exists
        // const userExists = await User.findOne({
        //   email: user.email,
        // });
        const userExists = true;

        // if not, create a new user
        if (!userExists) {
          // await User.create({
          //   email: user.email,
          //   // username: user.name?.replace(" ", "").toLowerCase(),
          //   image: user.image,
          //   username: "user" + Date.now(),
          // });
        }

        return true;
      } catch (error) {
        console.log("error:", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
