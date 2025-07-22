'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Play } from 'lucide-react';
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
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
              fill="currentColor"
            />
            <path
              d="M12.5 12.25c0-.41-.34-.75-.75-.75s-.75.34-.75.75v3.5c0 .41.34.75.75.75s.75-.34.75-.75v-3.5z"
              fill="currentColor"
            />
            <circle cx="12" cy="9" r="1" fill="currentColor" />
          </svg>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Welcome to Baobab Golf
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Your modern companion for tracking golf scores, with a little help from AI.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
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
            <Button onClick={handleNewGame} className="w-full" variant="secondary">
              Start Scoring
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card/50 hover:bg-card/80 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="text-accent" />
              AI Score Estimator
            </CardTitle>
            <CardDescription>
              Estimate a player's score based on various factors.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" variant="secondary">
              <Link href="/ai-estimator">Launch Estimator</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
