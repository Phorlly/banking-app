import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const ibmPlexSerif = IBM_Plex_Serif({ subsets: ['latin'], variable: '--font-ibm-serif', weight: ['400', '700'] });


export const metadata: Metadata = {
  title: "MW-88",
  description: "MW-88 is a modern banking platform for everyone.",
  icons: {
    icon: '/icons/logo.svg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibmPlexSerif.variable}`} >
        {children}
      </body>
    </html>
  );
}
