'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SCORECARD_STORAGE_KEY } from '@/lib/constants';

export default function NewGamePage() {
  const router = useRouter();

  useEffect(() => {
    // Clear previous game data from local storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem(SCORECARD_STORAGE_KEY);
    }
    router.replace('/hole/1');
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-white">Starting new game...</p>
    </div>
  );
}
