import { Header } from '@/components/Header';
import SummaryTable from './SummaryTable';

export default function SummaryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto p-4 sm:p-8">
        <SummaryTable />
      </main>
    </div>
  );
}
