import type { Metadata } from "next";
import {
  ClerkProvider,
  SignedOut,
  SignInButton
} from '@clerk/nextjs'
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "personaPal",
  description: "An app to chat with anyone you like.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn("bg-secondary", `${geistSans.variable} ${geistMono.variable} antialiased`)}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <header>



            </header>

            <main>{children}</main>
            <footer className="fixed bottom-0 left-0 right-0 p-4 bg-yellow-100 dark:bg-yellow-900 border-t border-yellow-200 dark:border-yellow-800">
              <div className="container mx-auto text-center">
                <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                  ⚠️ The AI chat functionality may be limited due to Replicate free plan restrictions.
                  For more information, please visit my {" "}
                  <a
                    href="https://github.com/faisalbhuiyan3038/persona-pal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    GitHub
                  </a>
                </p>
              </div>
            </footer>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
