'use client';

import { usePathname } from 'next/navigation';

export default function ConditionalBackground() {
  const pathname = usePathname();

  if (pathname === '/') {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-cover bg-center -z-10"
      style={{ backgroundImage: "url('/hole-in-one.jpg')" }}
    >
       <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
    </div>
  );
}
