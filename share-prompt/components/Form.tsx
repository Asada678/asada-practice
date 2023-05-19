import { FC } from "react";

import Link from "next/link";

import { Post } from "@type/Prompt";

// import Post from "@types/Post";

interface FormProps {
  type: "Create" | "Edit";
  post: Post;
  setPost: (post: Post) => void;
  submitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const Form: FC<FormProps> = ({ type, post, setPost, submitting, onSubmit }) => {
  return (
    <section className="flex-start w-full max-w-screen-xl flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{`${type} Post`}</span>
      </h1>
      <p className="desc test-left max-w-md">
        {type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform.
      </p>

      <form
        onSubmit={onSubmit}
        className="glassmorphism p-t mt-10 flex w-full max-w-2xl flex-col gap-7"
      >
        <label>
          <span className="font-satoshi text-base font-semibold text-gray-700">Your AI Prompt</span>
          <textarea
            value={post.prompt}
            onChange={(e) => {
              setPost({
                ...post,
                prompt: e.target.value,
              });
            }}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          ></textarea>
        </label>
        <label>
          <span className="font-satoshi text-base font-semibold text-gray-700">Tag</span>
          <span className="font-normal">{` `}(#product, #webdevelopment, #idea)</span>
          <input
            value={post.tag}
            onChange={(e) => {
              setPost({
                ...post,
                tag: e.target.value,
              });
            }}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link
            href="/"
            className="text-sm text-gray-500"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-primary-orange px-5 py-2 text-sm text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
