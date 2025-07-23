'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Play } from 'lucide-react';
import { SCORECARD_STORAGE_KEY } from '@/lib/constants';

export default function Home() {
  const router = useRouter();

  const handleNewGame = () => {
    // Clear previous game data from local storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem(SCORECARD_STORAGE_KEY);
    }
    router.push('/hole/1');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="mb-4">
          <Image
            src="/add-hope.png"
            alt="Baobab Golf Logo"
            width={80}
            height={80}
            className="rounded-full"
          />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Welcome to Baobab Golf
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Your modern companion for tracking golf scores.
        </p>
      </div>

      <div className="w-full max-w-xs">
        <Card className="bg-card/50 hover:bg-card/80 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="text-accent" />
              New Game
            </CardTitle>
            <CardDescription>
              Start a fresh 18-hole game for you and your team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleNewGame} className="w-full">
              Start Scoring
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
