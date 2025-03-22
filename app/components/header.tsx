import Link from "next/link";
import { Search, Bell, User } from "lucide-react";

export function Header() {
  return (
    <header className="w-full py-3 px-4 flex items-center justify-between border-b">
      <div className="flex items-center space-x-8">
        <Link href="/" className="font-bold text-2xl">
          MY<span className="text-black">★</span>Z
        </Link>
        <nav className="flex space-x-6">
          <Link href="/" className="text-base font-medium">
            이니셔티브
          </Link>
          <Link href="/marketplace" className="text-base font-medium">
            마켓플레이스
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <button aria-label="Search" className="p-2">
          <Search size={24} />
        </button>
        <button aria-label="Notifications" className="p-2">
          <Bell size={24} />
        </button>
        <Link href="/reward-pass" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center">
            <User size={20} />
          </div>
          <span className="font-medium hidden md:inline">컬렉션</span>
        </Link>
      </div>
    </header>
  );
}
