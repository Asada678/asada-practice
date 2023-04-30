import Navigation from "./components/Navigation";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Navigation />
          <main className="ax-w-screen-xl container mx-auto flex-1 px-5 py-5">{children}</main>

          <footer className="border-t py-5">
            <div className="text-center text-sm">Copyright @ All rights reserved | Asada Tomoya</div>
          </footer>
        </div>
      </body>
    </html>
  );
}
