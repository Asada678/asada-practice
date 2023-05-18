"use client";

import { FC, useEffect, useState } from "react";

import { Prompt } from "@type/Prompt";
import { data } from "autoprefixer";

import PromptCard from "./PromptCard";

interface FeedProps {}
interface PromptCardListProps {
  data: Array<Prompt>;
  handleTagClick: () => void;
}

const PromptCardList: FC<PromptCardListProps> = ({ data, handleTagClick }) => {
  return (
    <div className="prompt_layout mt-16">
      {data.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed: FC<FeedProps> = ({}) => {
  const [searchText, setSearchText] = useState("");
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const handleSearchChange = () => {};

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPrompts(data);
    };
    fetchPrompts();
  }, []);
  return (
    <section className="feed">
      <form className="flex-center relative w-full">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={prompts}
        handleTagClick={() => {}}
      />
    </section>
  );
};

export default Feed;
