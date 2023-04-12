"use client";
import { useState } from "react";
import { Box, Button, Container, Grid, Slider, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";

interface Sentence {
  en: string;
  ja: string;
}

const sampleSentences = [
  {
    english: "I have a cat.",
    japanese: "私は猫を飼っています。",
  },
  {
    english: "She is studying English.",
    japanese: "彼女は英語を勉強しています。",
  },
  {
    english: "He works at a company.",
    japanese: "彼は会社で働いています。",
  },
  {
    english: "The sky is blue.",
    japanese: "空は青いです。",
  },
  {
    english: "We went to the beach.",
    japanese: "私たちは海に行きました。",
  },
];

const Label = styled(Typography)({
  fontSize: "1.2rem",
  marginBottom: "1rem",
  display: "block",
});

const Input = styled(TextField)({
  padding: "1rem",
  fontSize: "1rem",
  borderRadius: "0.25rem",
  border: "1px solid #ccc",
  marginBottom: "2rem",
  width: "100%",
});

const ButtonStyled = styled(Button)({
  backgroundColor: "#0070f3",
  color: "white",
  fontSize: "1rem",
  padding: "1rem",
  borderRadius: "0.25rem",
  border: "none",
  cursor: "pointer",
});

const SentenceContainer = styled(Box)({
  backgroundColor: "#f5f5f5",
  marginTop: "2rem",
  padding: "2rem",
});

const Text = styled(Typography)({
  fontSize: "1.2rem",
  marginBottom: "1rem",
  color: "black",
});

const RangeContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const RangeLabel = styled(Typography)({
  fontSize: "0.9rem",
  minWidth: "5rem",
  textAlign: "center",
});

const useStyles = () => ({
  container: {
    paddingTop: "8rem",
    paddingBottom: "8rem",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "2rem",
    textAlign: "center",
  },
  sentence: {
    marginBottom: "2rem",
  },
});

export default function Home() {
  const classes = useStyles();
  const [word, setWord] = useState("");
  const [age, setAge] = useState<number>(20);
  const [wordCount, setWordCount] = useState<number>(10);
  const [sentenceCount, setSentenceCount] = useState<number>(1);
  const [sentences, setSentences] = useState<Sentence[]>(sampleSentences);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // APIエンドポイントを指定
    const endpoint = `/api/generate?word=${word}&age=${age}&wordCount=${wordCount}&sentenceCount=${sentenceCount}`;

    // APIリクエストを送信
    const res = await fetch(endpoint);
    const data = await res.json();

    // 生成された例文をセット
    setSentences(data.sentences);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ ...classes.container }}
    >
      <Typography
        variant="h1"
        sx={{ ...classes.title }}
      >
        Example Site
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
      >
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={12}
            sm={6}
          >
            <Input
              id="word"
              name="word"
              label="Input a word"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <Label>Age: {age} years old</Label>
            <RangeContainer>
              <RangeLabel>{1}</RangeLabel>
              <Slider
                value={age}
                onChange={(e, value) => setAge(value as number)}
                min={1}
                max={120}
                step={1}
                sx={{ width: "100%", mr: "1rem" }}
              />
              <RangeLabel>{120}</RangeLabel>
            </RangeContainer>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <Label>Number of words per sentence: {wordCount}</Label>
            <RangeContainer>
              <RangeLabel>{5}</RangeLabel>
              <Slider
                value={wordCount}
                onChange={(e, value) => setWordCount(value as number)}
                min={5}
                max={20}
                step={1}
                sx={{ width: "100%", mr: "1rem" }}
              />
              <RangeLabel>{20}</RangeLabel>
            </RangeContainer>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <Label>Number of sentences to generate: {sentenceCount}</Label>
            <RangeContainer>
              <RangeLabel>{1}</RangeLabel>
              <Slider
                value={sentenceCount}
                onChange={(e, value) => setSentenceCount(value as number)}
                min={1}
                max={10}
                step={1}
                sx={{ width: "100%", mr: "1rem" }}
              />
              <RangeLabel>{10}</RangeLabel>
            </RangeContainer>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <ButtonStyled
              variant="contained"
              type="submit"
            >
              Generate Sentences
            </ButtonStyled>
          </Grid>
        </Grid>
      </Box>
      {sentences.length > 0 && (
        <Box mt={4}>
          {sentences.map((sentence, index) => (
            <SentenceContainer key={index}>
              <Text>{sentence.english}</Text>
              <Typography>{sentence.japanese}</Typography>
            </SentenceContainer>
          ))}
        </Box>
      )}
    </Container>
  );
}
