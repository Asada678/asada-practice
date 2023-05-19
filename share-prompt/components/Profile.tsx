import { FC } from "react";

import { Prompt } from "@type/Prompt";

import PromptCard from "./PromptCard";

interface ProfileProps {
  name: "My";
  desc: string;
  data: Array<Prompt>;
  handleEdit: (prompt: Prompt) => void;
  handleDelete: (prompt: Prompt) => void;
}

const Profile: FC<ProfileProps> = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text  text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="prompt_layout mt-10">
        {data.map((prompt) => (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleEdit={() => handleEdit(prompt)}
            handleDelete={() => handleDelete(prompt)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
