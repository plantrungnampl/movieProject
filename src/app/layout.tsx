import type { Metadata } from "next";
import "./globals.css";
import { Source_Sans_3 } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/app/components/theme-provider";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header/Header";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/lib/constants";
import Transition from "./components/Transition";
const sourceSansPro = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
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
  const session = cookies().get(SESSION_COOKIE_NAME)?.value || null;

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
          <Header session={session} />
          <Toaster />
          <SpeedInsights />
          <Suspense fallback={<div>Loading...</div>}>
            <Transition>{children}</Transition>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
// export default dynamic(() => Promise.resolve(RootLayout), {
//   ssr: false,
// });
