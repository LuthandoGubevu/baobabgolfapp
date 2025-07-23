'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

const playerSchema = z.object({
  name: z.string().min(1, 'Player name is required.'),
  email: z.string().email('Invalid email address.').optional().or(z.literal('')),
});

const registerTeamFormSchema = z.object({
  teamName: z.string().min(2, 'Team name must be at least 2 characters.'),
  sponsor: z.string().optional(),
  players: z.array(playerSchema).min(1),
});

export type RegisterTeamFormState = {
  message: string;
  success: boolean;
  errors?: {
    teamName?: string[];
    sponsor?: string[];
    players?: string[];
  }
}

export async function registerTeam(
    prevState: RegisterTeamFormState,
    formData: FormData
): Promise<RegisterTeamFormState> {
    
    const players = [
        { name: formData.get('player1Name') as string, email: formData.get('player1Email') as string },
        { name: formData.get('player2Name') as string, email: '' },
        { name: formData.get('player3Name') as string, email: '' },
        { name: formData.get('player4Name') as string, email: '' },
    ].filter(p => p.name);

    const dataToValidate = {
        teamName: formData.get('teamName'),
        sponsor: formData.get('sponsor'),
        players: players
    }

    const validatedFields = registerTeamFormSchema.safeParse(dataToValidate);

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Please correct the errors below.',
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
    
    try {
        await addDoc(collection(db, 'teams'), validatedFields.data);
        revalidatePath('/teams');
        return { success: true, message: 'Team registered successfully!' };

    } catch (e) {
        console.error('Error adding document: ', e);
        return { success: false, message: 'An unexpected error occurred. Please try again.' };
    }
}
