import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import axios from "axios";

interface MainComponentProps {}

const MainComponent: FC<MainComponentProps> = ({}) => {
  const { data, error, refetch, isError, isLoading } = useQuery({
    queryKey: ["mydata"],
    queryFn: async () => {
      const { data } = await axios.get("someurl.com");
    },
  });

  return <div>MainComponent</div>;
};

export default MainComponent;
