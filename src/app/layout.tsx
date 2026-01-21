import { CommandPalette } from '../components/CommandPalette';
import '../app/globals.css';

export const metadata = {
  title: 'Digital8 OS | Productivity',
  description: 'High-performance task management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-[#f5f5f5] antialiased font-sans">
        {children}
        <CommandPalette />
      </body>
    </html>
  );
}
