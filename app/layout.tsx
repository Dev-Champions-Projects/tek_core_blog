import { Toaster } from "@/components/ui/sonner";
import { CategoriesProvider } from "@/components/categories-context";
import { NetworkStatusProvider } from "@/components/network-status-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tek Blog",
  description:
    "A blog for both developers and designers, sharing insights, tutorials, and stories from the tech world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      {/* <body className="w-full min-w-dvw"> */}
      <body className="w-full overflow-x-hidden">
        <NetworkStatusProvider>
          <CategoriesProvider>{children}</CategoriesProvider>
        </NetworkStatusProvider>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
