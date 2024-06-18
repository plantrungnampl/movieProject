import type { Metadata } from "next";
import "./globals.css";
import { Source_Sans_3 } from "@next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/app/components/theme-provider";
import { Suspense } from "react";
import Loading from "./loading";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header/Header";
import { Analytics } from "@vercel/analytics/react";

// const inter = Inter({ subsets: ["latin"] });
const sourceSansPro = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Movies dev",
  description: "This is a movies project for educational purposes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>{String(metadata.title) ?? "movie"}</title>
        <meta
          name="description"
          content={metadata.description ?? "default description"}
        />
      </head>
      <body className={sourceSansPro.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <Toaster />
          <Analytics />
          <SpeedInsights />
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
