import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import ConditionalNavBar from '@/components/ConditionalNavBar';
import ConditionalBackground from '@/components/ConditionalBackground';
import InstallPwa from '@/components/InstallPwa';

export const metadata: Metadata = {
  title: 'Baobab Golf',
  description: 'A modern golf scorecard application.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet"></link>
        <meta name="theme-color" content="#e4002b" />
      </head>
      <body className="font-body antialiased min-h-screen bg-background flex flex-col">
        <ConditionalBackground />
        <InstallPwa />
        <div className="flex-grow pb-20 z-10">
            {children}
        </div>
        <ConditionalNavBar />
        <Toaster />
      </body>
    </html>
  );
}
