import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Data {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const usePost = (postId: number) => {
  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  return useQuery({
    queryKey: ["myQuery"],
    queryFn: async () => {
      await wait(2000);
      const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      return data as Data;
    },
    onSuccess(data) {
      //
    },
    onError(error) {
      //
    },
  });
};
