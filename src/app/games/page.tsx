import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { List } from 'lucide-react';
import Link from 'next/link';

const gameHistory = [
  { id: 1, course: 'Pebble Beach', date: '2024-07-20', score: 152, winner: 'Alex Morgan' },
  { id: 2, course: 'Augusta National', date: '2024-07-13', score: 148, winner: 'Ben Carter' },
  { id: 3, course: 'St Andrews', date: '2024-07-06', score: 158, winner: 'Alex Morgan' },
  { id: 4, course: 'Pinehurst No. 2', date: '2024-06-29', score: 155, winner: 'David Smith' },
];

export default function GameHistoryPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4 sm:p-6">
        <h1 className="text-3xl font-bold text-white mb-6">Game History</h1>
        <div className="space-y-4">
          {gameHistory.map((game) => (
            <Card key={game.id} className="animate-in fade-in-50">
              <CardHeader>
                <CardTitle>{game.course}</CardTitle>
                <CardDescription>{game.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Team Score</p>
                    <p className="text-2xl font-bold text-primary">{game.score}</p>
                  </div>
                   <div>
                    <p className="text-sm text-muted-foreground">Top Player</p>
                    <p className="text-lg font-semibold">{game.winner}</p>
                  </div>
                </div>
              </CardContent>
               <CardFooter>
                 <Button variant="outline" asChild>
                    <Link href="/summary">View Full Scorecard</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}