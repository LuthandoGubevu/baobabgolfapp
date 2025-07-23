'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SCORECARD_STORAGE_KEY } from '@/lib/constants';

export default function NewGamePage() {
  const router = useRouter();

  const handleStartGame = (numberOfHoles: 9 | 18) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(SCORECARD_STORAGE_KEY);
      localStorage.setItem('baobab-golf-hole-count', numberOfHoles.toString());
    }
    router.replace('/hole/1');
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Select Game Length</CardTitle>
          <CardDescription>How many holes are you playing today?</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Button onClick={() => handleStartGame(18)} size="lg">
            18 Holes
          </Button>
          <Button onClick={() => handleStartGame(9)} size="lg" variant="secondary">
            9 Holes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
