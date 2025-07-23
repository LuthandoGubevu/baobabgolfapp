import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center space-x-4 px-4 sm:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/add-hope.png"
            alt="Baobab Golf Logo"
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="font-bold">Baobab Golf</span>
        </Link>
      </div>
    </header>
  );
}
