"use client";

import { FC } from "react";

import { Prompt } from "@type/Prompt";

interface PromptCardProps {
  prompt: Prompt;
  handleTagClick: () => void;
}

const PromptCard: FC<PromptCardProps> = ({ prompt, handleTagClick }) => {
  return <div>PromptCard</div>;
};

export default PromptCard;
