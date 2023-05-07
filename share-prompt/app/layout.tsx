import { FC } from "react";
import "@styles/globals.css";

export const metadata = {
  title: "Share Prompt",
  description: "Discover & Share AI Prompts",
};

interface layoutProps {
  children: React.ReactNode;
}

const RootLayout: FC<layoutProps> = ({ children }) => {
  return (
    <html lang="ja">
      <body>
        <div className="main">
          <div className="gradient"></div>
        </div>
        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
