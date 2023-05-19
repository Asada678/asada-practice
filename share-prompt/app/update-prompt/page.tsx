"use client";

import React, { FC, useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";
import { Prompt } from "@type/Prompt";
import { useSession } from "next-auth/react";

interface EditPromptProps {}

const EditPrompt: FC<EditPromptProps> = ({}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [prompt, setPrompt] = useState<Prompt>({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const fetchPrompt = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPrompt({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (promptId) {
      fetchPrompt();
    }
  }, [promptId]);

  const editPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if(!promptId) {
      return alert("Prompt ID not found")
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
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
      type="Edit"
      post={prompt}
      setPost={setPrompt}
      submitting={submitting}
      onSubmit={editPrompt}
    />
  );
};

export default EditPrompt;
