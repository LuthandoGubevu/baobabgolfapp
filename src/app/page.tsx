'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/dashboard');
  };

  return (
    <main 
      className="relative flex min-h-screen flex-col items-center justify-center p-4 sm:p-8"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/put.jpg')" }}
      />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div className="relative z-10 flex flex-col items-center text-center mb-12">
        <Image
          src="/add-hope.png"
          alt="Baobab Golf Logo"
          width={112}
          height={112}
          className="rounded-full mb-8"
        />
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Baobab Golf
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Your modern companion for tracking golf scores.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-xs space-y-4">
          <Button onClick={handleStart} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Start
          </Button>
          <Button variant="secondary" className="w-full" asChild>
            <Link href="/teams/register">Register New Team</Link>
          </Button>
      </div>
    </main>
  );
}
