import { FC } from "react";

interface PageProps {
  params: {
    userId: string;
  };
}

export const revalidate = 60;

export async function generateStaticParams() {
  // fetch from db...
  const userIds_ = await fetch("/some-url", {
    next: { revalidate: 60 },
  });

  const userIds = ["1", "2", "3", "4"];

  return userIds.map((userId) => ({
    userId,
  }));
}

const page: FC<PageProps> = ({ params }) => {
  return <div>{params.userId}</div>;
};

export default page;
