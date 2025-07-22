'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useScorecard } from '@/hooks/use-scorecard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { PLAYERS } from '@/lib/constants';
import { Home } from 'lucide-react';

export default function SummaryTable() {
  const router = useRouter();
  const { scorecard, isLoaded, getTeamTotalForHole, getTotalTeamScore, resetScores } = useScorecard();

  const totalTeamScore = useMemo(() => getTotalTeamScore(), [getTotalTeamScore]);
  const playerTotals = useMemo(() => {
    return PLAYERS.reduce((acc, player) => {
      acc[player] = scorecard.reduce((playerTotal, hole) => {
        const score = hole.scores[player];
        return playerTotal + (typeof score === 'number' ? score : 0);
      }, 0);
      return acc;
    }, {} as { [key: string]: number });
  }, [scorecard]);

  const handleNewGame = () => {
    resetScores();
    router.push('/hole/1');
  };
  
  if (!isLoaded) {
    return <SummarySkeleton />;
  }
  
  return (
    <Card className="animate-in fade-in duration-500">
      <CardHeader>
        <CardTitle className="text-3xl">Game Summary</CardTitle>
        <CardDescription>Here's the final scorecard for your game.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Hole</TableHead>
                {PLAYERS.map(player => <TableHead key={player} className="text-center">{player}</TableHead>)}
                <TableHead className="text-center font-bold">Par</TableHead>
                <TableHead className="text-center font-bold text-primary">Team Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scorecard.map((hole, index) => (
                <TableRow key={hole.hole}>
                  <TableCell className="font-bold">{hole.hole}</TableCell>
                  {PLAYERS.map(player => (
                    <TableCell key={player} className="text-center">{hole.scores[player] || '-'}</TableCell>
                  ))}
                  <TableCell className="text-center">{hole.par}</TableCell>
                  <TableCell className="text-center font-semibold text-primary">{getTeamTotalForHole(index) || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
                <TableRow className="bg-secondary/50">
                    <TableHead className="font-extrabold">Total</TableHead>
                     {PLAYERS.map(player => (
                        <TableCell key={player} className="text-center font-bold">{playerTotals[player]}</TableCell>
                    ))}
                    <TableCell></TableCell>
                    <TableCell className="text-center font-extrabold text-primary text-lg">{totalTeamScore}</TableCell>
                </TableRow>
            </TableFooter>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="justify-between gap-4 flex-wrap">
        <Button onClick={handleNewGame}>Start New Game</Button>
        <Button variant="outline" onClick={() => router.push('/')}><Home className="mr-2 h-4 w-4"/> Return Home</Button>
      </CardFooter>
    </Card>
  );
}

function SummarySkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-5 w-72 mt-2" />
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <Skeleton className="h-12 w-full" />
                    {Array.from({length: 10}).map((_, i) => (
                        <Skeleton key={i} className="h-10 w-full" />
                    ))}
                </div>
            </CardContent>
            <CardFooter className="justify-between">
                <Skeleton className="h-10 w-36" />
                <Skeleton className="h-10 w-36" />
            </CardFooter>
        </Card>
    );
}
