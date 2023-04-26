import "./App.css";
import { usePost } from "./hooks/use-post";

function App() {
  const { data, isLoading, isError } = usePost(1);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  return <div>{JSON.stringify(data)}</div>;
}

export default App;
