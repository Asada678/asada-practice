import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { AuthRequiredError } from "@/lib/exceptions";

const session = null;

export default function Home() {
  if (!session) throw new AuthRequiredError();
  return <main>This is an auth-only page</main>;
}
