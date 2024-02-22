import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Screens } from "./screens/routes/Screens";
import './css/index.css';

const queryClient = new QueryClient();
console.log('queryClient : ', queryClient);
function App() { 
  return (
    <QueryClientProvider client={queryClient}>
      <Screens/>
    </QueryClientProvider>
  )
}

export default App;
