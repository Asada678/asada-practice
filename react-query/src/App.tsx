import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import MainComponent from "./MainComponent";

function App() {
  const queryCllient = new QueryClient();

  return (
    <QueryClientProvider client={queryCllient}>
      <MainComponent />
    </QueryClientProvider>
  );
}

export default App;
