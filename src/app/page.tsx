'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import RotatingGolfBall from "@/components/RotatingGolfBall";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/dashboard');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
      <div className="flex flex-col items-center text-center mb-12">
        <RotatingGolfBall />
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Baobab Golf
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Your modern companion for tracking golf scores.
        </p>
      </div>

      <div className="w-full max-w-xs">
          <Button onClick={handleStart} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Start
          </Button>
      </div>
    </main>
  );
}
