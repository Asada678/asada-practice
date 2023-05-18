"use client";

import React, { FC, useState } from "react";

import { useRouter } from "next/navigation";

import Form from "@components/Form";
import { Post } from "@type/Post";
import { useSession } from "next-auth/react";

interface CreatePromptProps {}

const CreatePrompt: FC<CreatePromptProps> = ({}) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<Post>({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user.id,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log("error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      onSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
