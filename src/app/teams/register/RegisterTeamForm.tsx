'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { registerTeam, RegisterTeamFormState } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Registering...' : 'Register Team'}
    </Button>
  );
}

export default function RegisterTeamForm() {
    const router = useRouter();
    const { toast } = useToast();
    const initialState: RegisterTeamFormState = { message: '', success: false };
    const [state, dispatch] = useFormState(registerTeam, initialState);

    useEffect(() => {
        if (state.success) {
            toast({
                title: "Success!",
                description: state.message,
            });
            router.push('/teams');
        }
    }, [state, router, toast]);

    return (
        <form action={dispatch} className="space-y-8">
             {state.message && !state.success && (
                <Alert variant="destructive">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                        {state.message}
                    </AlertDescription>
                </Alert>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Team Details</CardTitle>
                    <CardDescription>Provide the name of the team and an optional sponsor.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="teamName">Team Name</Label>
                        <Input id="teamName" name="teamName" placeholder="e.g., The Eagles" required />
                        {state.errors?.teamName && <p className="text-sm font-medium text-destructive">{state.errors.teamName}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="sponsor">Sponsor (Optional)</Label>
                        <Input id="sponsor" name="sponsor" placeholder="e.g., Acme Inc." />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Player Information</CardTitle>
                    <CardDescription>Designate one player as the scorekeeper by providing their email.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <Label htmlFor="player1Name" className="font-semibold">Player 1 (Scorekeeper)</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                             <div className="space-y-2">
                                <Label htmlFor="player1Name">Name</Label>
                                <Input id="player1Name" name="player1Name" placeholder="Player 1 Name" required />
                             </div>
                             <div className="space-y-2">
                                <Label htmlFor="player1Email">Email</Label>
                                <Input id="player1Email" name="player1Email" type="email" placeholder="Player 1 Email" required/>
                             </div>
                        </div>
                    </div>
                    
                    {[2,3,4].map(num => (
                        <div key={num} className="space-y-2">
                            <Label htmlFor={`player${num}Name`}>Player {num} (Optional)</Label>
                            <Input id={`player${num}Name`} name={`player${num}Name`} placeholder={`Player ${num} Name`} />
                        </div>
                    ))}
                </CardContent>
            </Card>

            <SubmitButton />
        </form>
    );
}
