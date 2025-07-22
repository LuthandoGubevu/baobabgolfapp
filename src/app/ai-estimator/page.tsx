import { Header } from '@/components/Header';
import { AIEstimatorForm } from './AIEstimatorForm';

export default function AIEstimatorPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4 sm:p-8">
        <AIEstimatorForm />
      </main>
    </>
  );
}
