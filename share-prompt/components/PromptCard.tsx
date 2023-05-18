"use client";

import { FC, useState } from "react";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import prompt from "@models/prompt";
import { Prompt } from "@type/Prompt";
import { useSession } from "next-auth/react";

interface PromptCardProps {
  prompt: Prompt;
  handleTagClick: (tag: string) => void;
  handleEdit: () => void;
  handleDelete: () => void;
}

const PromptCard: FC<PromptCardProps> = ({ prompt, handleTagClick, handleEdit, handleDelete }) => {
  const [copiedPrompt, setCopiedPrompt] = useState("");
  const handleCopy = async () => {
    setCopiedPrompt(prompt.prompt);
    await navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => setCopiedPrompt(""), 3000);
  };
  return (
    <div className="prompt_card">
      <div className="flex items-start justify-between gap-5">
        <div className="flex flex-1 cursor-pointer items-center justify-start gap-3">
          <Image
            src={prompt.creator.image}
            alt="user image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">{prompt.creator.username}</h3>
            <p className="font-inter text-sm  text-gray-500">{prompt.creator.email}</p>
          </div>
        </div>
        <div
          className="copy_btn"
          onClick={handleCopy}
        >
          <Image
            src={copiedPrompt === prompt.prompt ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
            width={12}
            height={12}
            alt="copied"
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{prompt.prompt}</p>
      <p
        className="blue_gradient cursor-pointer font-inter text-sm"
        onClick={() => handleTagClick && handleTagClick(prompt.tag)}
      >
        {prompt.tag}
      </p>
    </div>
  );
};

export default PromptCard;
