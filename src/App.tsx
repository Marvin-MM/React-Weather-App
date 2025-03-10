import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/sonner";
import { WeatherDashboard } from "./pages/weather-dashboard";
import { Layout } from "./components/layout";
import { ThemeProvider } from "./context/theme-provider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CityPage } from "./pages/city-page";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const useAppLoading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulates app loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return isLoading;
};

function App() {

  const isLoading = useAppLoading();

  if (isLoading) {
    return <Loading />;
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark">
          <Layout>
            <Routes>
              <Route path="/" element={<WeatherDashboard />} />
              <Route path="/city/:cityName" element={<CityPage />} />
            </Routes>
          </Layout>
          <Toaster richColors />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
