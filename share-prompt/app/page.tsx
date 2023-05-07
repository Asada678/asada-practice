import { FC } from "react";

import Feed from "@components/Feed";

interface pageProps {}

const Home: FC<pageProps> = ({}) => {
  return (
    <section className="flex-center w-full flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="hidden md:block" />
        <span className="orange_gradient text-center"> AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Share-Prompt is an open-source AI prompting tool for modern world to discover, create and share creative prompts
      </p>
      <Feed />
    </section>
  );
};

export default Home;
