"use client";

import { ApiRequest } from "@/types/api-request";
import axios from "axios";

export default function Home() {
  const callApi = async () => {
    const payload: ApiRequest = {
      name: "john",
    };
    await axios.post("/api/endpoint", payload);
  };
  return (
    <div>
      <button onClick={callApi}>create user</button>
    </div>
  );
}
