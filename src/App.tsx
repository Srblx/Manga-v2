import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./context/UserContext";
import "./css/index.css";
import { Screens } from "./screens/routes/Screens";

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
