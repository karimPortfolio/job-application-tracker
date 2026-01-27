import { AuthProvider } from '@/components/AuthProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import { ConfirmDialog } from '@/components/common/dialogs/ConfirmDialog';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            {children}
            <ConfirmDialog />
            <Toaster richColors closeButton position="top-right" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
