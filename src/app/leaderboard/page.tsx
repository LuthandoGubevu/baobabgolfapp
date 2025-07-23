import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy } from 'lucide-react';

const leaderboardData = [
  { rank: 1, player: 'Alex Morgan', wins: 8, avgScore: 154.2, avatar: 'https://placehold.co/40x40.png', hint: 'man' },
  { rank: 2, player: 'Ben Carter', wins: 5, avgScore: 158.1, avatar: 'https://placehold.co/40x40.png', hint: 'woman' },
  { rank: 3, player: 'David Smith', wins: 3, avgScore: 160.5, avatar: 'https://placehold.co/40x40.png', hint: 'person smiling' },
  { rank: 4, player: 'Chris Davis', wins: 2, avgScore: 161.0, avatar: 'https://placehold.co/40x40.png', hint: 'person' },
];

export default function LeaderboardPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4 sm:p-6">
        <h1 className="text-3xl font-bold text-white mb-6">Leaderboard</h1>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px] text-center">Rank</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead className="text-center">Wins</TableHead>
                  <TableHead className="text-right">Avg Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((entry) => (
                  <TableRow key={entry.player}>
                    <TableCell className="font-bold text-center">
                      <div className="flex justify-center">
                        {entry.rank === 1 ? (
                          <Trophy className="h-6 w-6 text-yellow-400" />
                        ) : (
                          entry.rank
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={entry.avatar} alt={entry.player} data-ai-hint={entry.hint}/>
                          <AvatarFallback>{entry.player.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-white">{entry.player}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{entry.wins}</TableCell>
                    <TableCell className="text-right font-mono">{entry.avgScore.toFixed(1)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </>
  );
}