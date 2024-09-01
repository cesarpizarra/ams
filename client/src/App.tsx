import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from './layout/MainLayout';
import LoginForm from './components/LoginForm';
import AppRoutes from './routes/Routes';

const API_URL = import.meta.env.VITE_API_URL;
axios.defaults.baseURL = API_URL;

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Router>
          <Routes>
            {/* Route without MainLayout */}
            <Route path="/" element={<LoginForm />} />

            {/* Routes with MainLayout */}
            <Route path="*" element={<MainLayoutWrapper />} />
          </Routes>
          <Toaster position="top-right" richColors />
        </Router>
      </div>
    </QueryClientProvider>
  );
};

// MainLayoutWrapper Component to include all other routes within MainLayout
const MainLayoutWrapper: React.FC = () => {
  return (
    <MainLayout>
      <AppRoutes />
    </MainLayout>
  );
};

export default App;
