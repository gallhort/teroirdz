"use client";

interface AdminHeaderProps {
  title: string;
  onMenuClick: () => void;
}

export default function AdminHeader({ title, onMenuClick }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-cream-dark px-4 py-4 flex items-center gap-4">
      <button
        className="lg:hidden p-2 rounded-lg hover:bg-cream-dark transition-colors"
        onClick={onMenuClick}
        aria-label="Menu"
      >
        <svg className="w-5 h-5 text-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <h1 className="text-lg font-serif font-bold text-brown">{title}</h1>
    </header>
  );
}
