'use client';

import { usePathname } from 'next/navigation';
import BottomNavBar from './BottomNavBar';

export default function ConditionalNavBar() {
  const pathname = usePathname();

  if (pathname === '/') {
    return null;
  }

  return <BottomNavBar />;
}
