import type { Metadata } from 'next';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/600.css';
import './globals.css';
import NavigationShell from '@/components/NavigationShell';

export const metadata: Metadata = {
  title: 'SkyNest Robotics | Autonomous Retail & Restaurant Drone Network',
  description:
    'Open suburban drone delivery network replacing $8–15 gig drivers with $1–3 autonomous deliveries at scale (30+ deliveries/drone-day) across a $150B+ market.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-obsidian-950 text-slate-100">
        <NavigationShell>{children}</NavigationShell>
      </body>
    </html>
  );
}
