import { Header } from '@/components/Header';
import RegisterTeamForm from './RegisterTeamForm';

export default function RegisterTeamPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4 sm:p-8 max-w-3xl">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Register a New Team</h1>
            <p className="text-muted-foreground mt-2">Fill out the form below to get your team on the roster.</p>
        </div>
        <RegisterTeamForm />
      </main>
    </>
  );
}
