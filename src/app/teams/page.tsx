import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

async function getTeams() {
    const teamsCol = collection(db, 'teams');
    const teamSnapshot = await getDocs(teamsCol);
    const teamList = teamSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    return teamList;
}


export default async function TeamsPage() {
  const teams = await getTeams();

  return (
    <>
      <Header />
      <main className="container mx-auto p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">Registered Teams</h1>
            <Button asChild>
                <Link href="/teams/register">Register New Team</Link>
            </Button>
        </div>
        
        {teams.length === 0 ? (
            <div className="text-center py-12">
                <p className="text-muted-foreground">No teams have been registered yet.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team: any) => (
                <Card key={team.id}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <Users className="text-primary"/>
                        {team.teamName}
                    </CardTitle>
                    {team.sponsor && <CardDescription>Sponsored by {team.sponsor}</CardDescription>}
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        {team.players.map((player: any, index: number) => (
                            <li key={index} className="flex items-center gap-2">
                                <span className="font-semibold text-white">{player.name}</span>
                                {index === 0 && <span className="text-xs text-primary">(Scorekeeper)</span>}
                            </li>
                        ))}
                    </ul>
                </CardContent>
                </Card>
            ))}
            </div>
        )}
      </main>
    </>
  );
}
