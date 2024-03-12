import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Screens } from "./screens/routes/Screens";
import "./css/index.css";
import { UserProvider } from "./context/UserContext";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
      <Screens />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;

