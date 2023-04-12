import express, { Express, Request, Response } from "express";
const port = 8000;

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("hello from express + TS!!!");
});

app.listen(port, () => {
  console.log("listening on port :", port);
});
