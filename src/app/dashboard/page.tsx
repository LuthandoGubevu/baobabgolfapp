import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Header } from '@/components/Header';
import { Users, BarChart, Clock, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const teamMembers = [
  { name: 'Alex Morgan', avatar: 'https://placehold.co/40x40.png', hint: 'man' },
  { name: 'Ben Carter', avatar: 'https://placehold.co/40x40.png', hint: 'woman' },
  { name: 'Chris Davis', avatar: 'https://placehold.co/40x40.png', hint: 'person' },
  { name: 'David Smith', avatar: 'https://placehold.co/40x40.png', hint: 'person smiling' },
];

export default function DashboardPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4 sm:p-6 space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <Button asChild>
                <Link href="/ai-estimator">AI Estimator</Link>
            </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Team Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.name} className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.hint} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-white">{member.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Recent Game</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-2xl font-bold text-white">Pebble Beach</p>
              <p className="text-xs text-muted-foreground">Team Score: 152 - Yesterday</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Team Avg Score</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-2xl font-bold text-white">155.8</p>
              <p className="text-xs text-muted-foreground">Based on last 5 games</p>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="text-primary"/>
                    Top Performance
                  </CardTitle>
                  <CardDescription>Last week's winning game.</CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="flex justify-between items-center p-4 bg-secondary/50 rounded-lg">
                    <div>
                        <p className="text-lg font-bold text-white">Augusta National</p>
                        <p className="text-sm text-muted-foreground">Final Score: 148</p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href="/summary">View Details</Link>
                    </Button>
                  </div>
              </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}