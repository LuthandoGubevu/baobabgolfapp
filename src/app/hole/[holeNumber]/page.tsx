import { Header } from '@/components/Header';
import HoleScorecard from './HoleScorecard';
import { TOTAL_HOLES } from '@/lib/constants';
import { notFound } from 'next/navigation';

type HolePageProps = {
  params: {
    holeNumber: string;
  };
};

export function generateStaticParams() {
  return Array.from({ length: TOTAL_HOLES }, (_, i) => ({
    holeNumber: (i + 1).toString(),
  }));
}

export default function HolePage({ params }: HolePageProps) {
  const holeNumber = parseInt(params.holeNumber, 10);

  if (isNaN(holeNumber) || holeNumber < 1 || holeNumber > TOTAL_HOLES) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="container mx-auto p-4 sm:p-8">
        <HoleScorecard holeNumber={holeNumber} />
      </main>
    </>
  );
}
