
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const alphaPhotoUrl = "https://code-alpha-image-gallary.vercel.app/alpha.jpeg";
const pageUrl = "https://birthday-blast-alpha.web.app"; // Replace with your actual deployed page URL if known, otherwise, relative paths are fine for some platforms.
const siteName = "Birthday Blast for Alpha!";
const pageTitle = "You're Invited to Alpha Dumbuya's Birthday Blast!";
const pageDescription = "Join us in celebrating Alpha Dumbuya's birthday! Check out this special page with a countdown, AI message generator, and virtual card.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  applicationName: siteName,
  authors: [{ name: "Birthday Blast Creators" }],
  keywords: ["birthday", "celebration", "Alpha Dumbuya", "virtual card", "AI message"],
  
  openGraph: {
    type: 'website',
    url: pageUrl, // Best to use the canonical URL of your page here
    title: pageTitle,
    description: pageDescription,
    siteName: siteName,
    images: [
      {
        url: alphaPhotoUrl, // Must be an absolute URL
        width: 1200, // Recommended Open Graph image width
        height: 630, // Recommended Open Graph image height
        alt: `A festive birthday image for Alpha Dumbuya`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image', // summary_large_image shows a large preview image
    // site: '@yourXhandle', // Optional: your X (Twitter) handle
    // creator: '@creatorXhandle', // Optional: content creator's X (Twitter) handle
    title: pageTitle,
    description: pageDescription,
    images: [alphaPhotoUrl], // Must be an absolute URL
  },
  // Apple-specific tags
  appleWebApp: {
    capable: true,
    title: pageTitle,
    statusBarStyle: 'black-translucent',
  },
  // Icons - You can add more specific icon links if you have them
  icons: {
    icon: '/favicon.ico', // Example, ensure you have a favicon
    apple: '/apple-touch-icon.png', // Example for Apple touch icon
  },
  manifest: '/site.webmanifest', // Example, if you have a web app manifest
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
