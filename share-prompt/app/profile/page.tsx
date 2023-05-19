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
  const router = useRouter();
  const handleEdit = (prompt: Prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };
  const handleDelete = async (prompt: Prompt) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

    try {
      await fetch(`/api/prompt/${prompt._id?.toString()}`, { method: "DELETE" });

      const filteredPrompts = prompts.filter((p) => p._id !== prompt._id);
      setPrompts(filteredPrompts);
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/prompts`);
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
