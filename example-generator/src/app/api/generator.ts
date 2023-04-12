import { NextApiRequest, NextApiResponse } from "next";
import { generateSentences } from "../../utils/generateSentences";

interface QueryParams {
  word: string;
  age: string;
  wordCount: string;
  sentenceCount: string;
}

interface Sentence {
  en: string;
  ja: string;
}

export default function
