
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Roboto, Open_Sans } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-roboto',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-open-sans',
  display: 'swap',
});

const alphaPhotoUrl = "https://code-alpha-image-gallary.vercel.app/alpha.jpeg";
const pageUrl = "https://alpha-s-bday.vercel.app";
const siteName = "Birthday Blast for Justious Samura Dumbuya!";
const pageTitle = "You're Invited to Justious Samura Dumbuya's Birthday Blast!";
const pageDescription = "Join us in celebrating Justious Samura Dumbuya's birthday! Check out this special page with a countdown, AI message generator, and virtual card.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  applicationName: siteName,
  authors: [{ name: "Birthday Blast Creators" }],
  keywords: ["birthday", "celebration", "Justious Samura Dumbuya", "virtual card", "AI message"],
  
  openGraph: {
    type: 'website',
    url: pageUrl,
    title: pageTitle,
    description: pageDescription,
    siteName: siteName,
    images: [
      {
        url: alphaPhotoUrl,
        width: 1200,
        height: 630,
        alt: `A festive birthday image for Justious Samura Dumbuya`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: [alphaPhotoUrl],
  },
  appleWebApp: {
    capable: true,
    title: pageTitle,
    statusBarStyle: 'black-translucent',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${openSans.variable} dark`}>
      <head />
      <body className="font-body antialiased min-h-screen bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
