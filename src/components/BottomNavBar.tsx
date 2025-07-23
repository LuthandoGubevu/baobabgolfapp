'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart2, History, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

// Custom Golf icon as Lucide doesn't have one
const GolfIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M18.5 18.5L6 6"/>
        <path d="M18 6h-6a6 6 0 1 0 0 12h1"/>
        <path d="M12 18V6"/>
    </svg>
);


const navItems = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/leaderboard', icon: BarChart2, label: 'Leaderboard' },
  { href: '/games/new', icon: GolfIcon, label: 'New Game', isCentral: true },
  { href: '/games', icon: History, label: 'History' },
  { href: '/logout', icon: LogOut, label: 'Logout' },
];

export default function BottomNavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#1e1e1e] border-t border-[#4d4d4d] flex justify-around items-center z-50">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center justify-center text-xs transition-colors',
              isActive ? 'text-[#e4002b]' : 'text-white hover:text-[#e4002b]',
              item.isCentral ? '-mt-6' : ''
            )}
          >
            {item.isCentral ? (
              <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full border-4 border-background shadow-lg">
                <item.icon className="w-8 h-8 text-white" />
              </div>
            ) : (
              <>
                <item.icon className="w-6 h-6 mb-1" />
                <span>{item.label}</span>
              </>
            )}
          </Link>
        );
      })}
    </nav>
  );
}