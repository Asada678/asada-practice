import { FC } from "react";

import Nav from "@components/Nav";
import "@styles/globals.css";
import Provider from "@components/Provider";
import { Session } from "next-auth";

export const metadata = {
  title: "Share Prompt",
  description: "Discover & Share AI Prompts",
};

interface layoutProps {
  children: React.ReactNode;
  session: Session;
}

const RootLayout: FC<layoutProps> = ({ children, session }) => {
  return (
    <html lang="ja">
      <body>
        <Provider session={session}>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
