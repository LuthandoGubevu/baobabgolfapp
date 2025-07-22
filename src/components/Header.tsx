import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center space-x-4 px-4 sm:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
              fill="currentColor"
            />
            <path
              d="M12.5 12.25c0-.41-.34-.75-.75-.75s-.75.34-.75.75v3.5c0 .41.34.75.75.75s.75-.34.75-.75v-3.5z"
              fill="currentColor"
            />
            <circle cx="12" cy="9" r="1" fill="currentColor" />
          </svg>
          <span className="font-bold">Baobab Golf</span>
        </Link>
      </div>
    </header>
  );
}
