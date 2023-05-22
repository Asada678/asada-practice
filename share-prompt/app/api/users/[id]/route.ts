import { NextRequest } from "next/server";

import User from "@models/user";
import { connectToDB } from "@utils/db";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();

    const user = await User.findOne({
      _id: params.id,
    });

    if (!user) {
      return new Response("User not exists", { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log("error:", error);
    return new Response("Failed to find user", { status: 500 });
  }
};
