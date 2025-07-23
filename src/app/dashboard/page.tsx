import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Header } from '@/components/Header';
import { Users, BarChart, Clock } from 'lucide-react';

const teamMembers = [
  { name: 'Player A', avatar: 'https://placehold.co/40x40.png' },
  { name: 'Player B', avatar: 'https://placehold.co/40x40.png' },
  { name: 'Player C', avatar: 'https://placehold.co/40x40.png' },
  { name: 'Player D', avatar: 'https://placehold.co/40x40.png' },
];

export default function DashboardPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4 sm:p-6 space-y-6">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-[#1e1e1e] border-[#4d4d4d]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Team Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.name} className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-white">{member.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1e1e1e] border-[#4d4d4d]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Recent Game</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-2xl font-bold text-white">-</p>
              <p className="text-xs text-muted-foreground">No recent games</p>
            </CardContent>
          </Card>
          
          <Card className="bg-[#1e1e1e] border-[#4d4d4d]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Score</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-2xl font-bold text-white">-</p>
              <p className="text-xs text-muted-foreground">No data available</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
