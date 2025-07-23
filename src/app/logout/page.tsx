'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Here you would typically clear any session/token
    // and then redirect to the homepage.
    router.replace('/');
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-white">Logging out...</p>
    </div>
  );
}
