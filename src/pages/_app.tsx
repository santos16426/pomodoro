import React from 'react';
import Layout from '@/app/components/Layout';
import { AppProps } from 'next/app';
import { AppProvider } from '@/app/context/AppContext';

const MyApp = ({ Component, pageProps } : AppProps) => {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
};

export default MyApp;
