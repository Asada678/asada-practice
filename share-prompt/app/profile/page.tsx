"use client";

import { FC, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import { Prompt } from "@type/Prompt";
import { useSession } from "next-auth/react";

interface ProfilePageProps {}

const ProfilePage: FC<ProfilePageProps> = ({}) => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const { data: session } = useSession();
  const handleEdit = () => {};
  const handleDelete = async () => {};

  console.log("session:", session);

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPrompts(data);
    };

    if (session?.user.id) {
      fetchPrompts();
    }
  }, []);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
