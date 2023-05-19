"use client";

import React, { FC, useState } from "react";

import { useRouter } from "next/navigation";

import Form from "@components/Form";
import { Prompt } from "@type/Prompt";
import { useSession } from "next-auth/react";

interface CreatePromptProps {}

const CreatePrompt: FC<CreatePromptProps> = ({}) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [prompt, setPrompt] = useState<Prompt>({
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
          prompt: prompt.prompt,
          tag: prompt.tag,
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
      post={prompt}
      setPost={setPrompt}
      submitting={submitting}
      onSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
