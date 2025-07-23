
'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useScorecard } from '@/hooks/use-scorecard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { PLAYERS } from '@/lib/constants';
import { ArrowLeft, ArrowRight, Trophy } from 'lucide-react';

type HoleScorecardProps = {
  holeNumber: number;
};

export default function HoleScorecard({ holeNumber }: HoleScorecardProps) {
  const router = useRouter();
  const { scorecard, isLoaded, totalHoles, updateScore, getBestScoresForHole, getTeamTotalForHole, getTotalTeamScore } = useScorecard();
  const holeIndex = holeNumber - 1;

  useEffect(() => {
    if (isLoaded && (!scorecard || !scorecard[holeIndex])) {
      // maybe the game ended, go to summary
      if (scorecard.length > 0) {
        router.push('/summary');
      } else {
        router.push('/');
      }
    }
  }, [isLoaded, scorecard, holeIndex, router]);

  const currentHoleData = useMemo(() => {
    return scorecard ? scorecard[holeIndex] : null;
  }, [scorecard, holeIndex]);

  const bestScores = useMemo(() => {
    return getBestScoresForHole(holeIndex);
  }, [getBestScoresForHole, holeIndex]);
  
  const teamTotalForHole = useMemo(() => {
    return getTeamTotalForHole(holeIndex);
  }, [getTeamTotalForHole, holeIndex]);

  const totalTeamScore = useMemo(() => getTotalTeamScore(), [getTotalTeamScore]);
  
  if (!isLoaded || !currentHoleData) {
    return <ScorecardSkeleton />;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="bg-card/70 animate-in fade-in duration-500">
        <CardHeader className="sticky top-16 bg-card/95 backdrop-blur-sm z-10 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">Par {currentHoleData.par}</div>
            <div className="text-sm font-semibold text-primary">Total Score: {totalTeamScore}</div>
          </div>
          <CardTitle className="text-4xl font-bold text-center">
            Hole {currentHoleData.hole}
          </CardTitle>
          <CardDescription className="text-center">
            Enter the score for each player. The best two scores will be summed up.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PLAYERS.map((player) => {
              const currentScore = currentHoleData.scores[player];
              const scoreValue = typeof currentScore === 'number' ? currentScore : '';
              const isBestScore = bestScores.includes(currentScore as number);
              
              return (
                <div key={player} className="space-y-2">
                  <Label htmlFor={`${player}-score`} className="text-lg">{player}</Label>
                  <div className="relative">
                    <Input
                      id={`${player}-score`}
                      type="number"
                      min="1"
                      max="10"
                      value={scoreValue}
                      onChange={(e) => updateScore(holeIndex, player, e.target.value === '' ? null : parseInt(e.target.value, 10))}
                      className={cn(
                        "text-2xl h-16 text-center font-bold",
                        isBestScore && "border-primary ring-2 ring-primary bg-primary/10"
                      )}
                      placeholder="-"
                    />
                    {isBestScore && (
                        <Trophy className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <Separator className="my-8" />
          <div className="flex justify-center items-baseline gap-4">
              <span className="text-muted-foreground">Hole Team Score:</span>
              <span className="text-4xl font-bold text-primary">{teamTotalForHole > 0 ? teamTotalForHole : '-'}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-4 bg-secondary/20 rounded-b-lg">
          <Button variant="outline" asChild disabled={holeNumber <= 1}>
            <Link href={`/hole/${holeNumber - 1}`}><ArrowLeft className="mr-2 h-4 w-4" /> Previous</Link>
          </Button>
          {holeNumber < totalHoles ? (
            <Button asChild>
              <Link href={`/hole/${holeNumber + 1}`}>Next <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/summary">View Summary <Trophy className="ml-2 h-4 w-4" /></Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

function ScorecardSkeleton() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-24" />
          </div>
          <Skeleton className="h-10 w-1/2 mx-auto mt-2" />
          <Skeleton className="h-5 w-3/4 mx-auto mt-2" />
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PLAYERS.map(player => (
              <div key={player} className="space-y-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-16 w-full" />
              </div>
            ))}
          </div>
           <Separator className="my-8" />
           <Skeleton className="h-10 w-1/3 mx-auto" />
        </CardContent>
        <CardFooter className="flex justify-between p-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </CardFooter>
      </Card>
    </div>
  );
}
