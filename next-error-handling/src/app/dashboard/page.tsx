import { AuthRequiredError } from "@/lib/exceptions";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  throw new AuthRequiredError();
  return <div>page</div>;
};

export default page;
