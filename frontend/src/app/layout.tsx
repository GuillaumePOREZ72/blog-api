import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Neoblog | Friendly Neobrutalism Blog',
  description:
    'A modern, playful blog built with Next.js and Neobrutalism design.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-body pt-8 pb-12 min-h-screen">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 mt-12">{children}</main>
      </body>
    </html>
  );
}
