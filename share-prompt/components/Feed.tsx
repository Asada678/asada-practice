"use client";

import { FC, useEffect, useState } from "react";

import { Prompt } from "@type/Prompt";
import { data } from "autoprefixer";

import PromptCard from "./PromptCard";

interface FeedProps {}
interface PromptCardListProps {
  data: Array<Prompt>;
  handleTagClick: (tagName: string) => void;
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
  const [searchResult, setSearchResults] = useState<Prompt[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<string | number | NodeJS.Timeout | undefined>("");

  const filterPrompts = (searchText: string): Prompt[] => {
    const regex = new RegExp(searchText, "i");

    return prompts.filter((p) => regex.test(p.creator?.username || "") || regex.test(p.tag) || regex.test(p.prompt));
  };

  const handleSearchChange = (e: React.ChangeEvent) => {
    const eventTarget = e.target as HTMLInputElement;
    const value = eventTarget.value;

    clearTimeout(searchTimeout);
    setSearchText(value);

    setSearchTimeout(
      window.setTimeout(() => {
        const result = filterPrompts(value);
        setSearchResults(result);
      }, 500)
    );
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);
    const result = filterPrompts(tagName);
    setSearchResults(result);
  };

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
        data={searchText ? searchResult : prompts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
