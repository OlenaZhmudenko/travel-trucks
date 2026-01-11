import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TravelTrucks - Camper Rental Service',
  description: 'Rent premium campers and explore Ukraine at your own pace. Wide selection of motorhomes, vans, and RVs for your perfect road trip.',
  keywords: 'camper rental, motorhome, RV rental, Ukraine travel, road trip',
  authors: [{ name: 'Olena Zhmudenko' }],
  openGraph: {
    title: 'TravelTrucks - Camper Rental Service',
    description: 'Rent premium campers for your perfect adventure',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
        
          <main className="flex-1">
            {children}
          </main>
        </div>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#101828',
              border: '1px solid #F2F4F7',
            },
            success: {
              iconTheme: {
                primary: '#E44848',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
