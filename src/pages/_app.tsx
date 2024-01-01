import React from 'react';
import Layout from '@/app/components/Layout';
import { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps } : AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
