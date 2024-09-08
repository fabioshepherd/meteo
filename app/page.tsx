'use client';

import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Weather from './component/Weather';

const queryClient = new QueryClient();

const Home = () => {
  return (
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <Weather />
      </QueryClientProvider>
    </NextUIProvider>
  );
};

export default Home;
