import React, { ReactNode } from 'react';
import '@/app/styles/globals.scss';
import { Quicksand } from 'next/font/google';
import { cn } from '@/app/lib/utils';
import Head from 'next/head';
import Header from './Header';

const quicksand = Quicksand({ subsets: ['latin'] });

interface LayoutProps {
    children: ReactNode;
} 
const Layout = ({ children }: LayoutProps) => {
    return (
        <div className={cn("relative h-full font-sans antialiased", quicksand.className)}>
            <Head>
                <title>Pomodoro App</title>
                <meta name="description" content='Pomodoro Technique: Boosting productivity with focused 25-minute work intervals, followed by short breaks, for effective time management.' />
            </Head>
            <main className='relative flex flex-col min-h-screen'>
                <div className='flex-grow flex-1'>
                <Header/>
                {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
