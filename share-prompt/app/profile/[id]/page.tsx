"use client";

import { FC, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import { Prompt } from "@type/Prompt";
import { User } from "@type/User";
import { data } from "autoprefixer";
import { useSession } from "next-auth/react";

interface OtherProfilePageProps {
  params: { id: string };
}

const OtherProfilePage: FC<OtherProfilePageProps> = ({ params }) => {
  const userId = params.id;
  const [user, setUser] = useState<User | null>(null);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const userResponse = await fetch(`/api/users/${userId}`);

      if (!userResponse.ok) {
        router.push("/404");
      }

      const user = await userResponse.json();

      setUser(user);

      const promptResponse = await fetch(`/api/users/${user?._id}/prompts`);
      const data = await promptResponse.json();

      setPrompts(data);
    };

    fetchUser();
  }, []);

  if (!user) return <div>loading...</div>;

  return (
    <Profile
      name={`${user.username}'s`}
      desc={`Welcome to ${user.username}'s profile page`}
      data={prompts}
    />
  );
};

export default OtherProfilePage;
