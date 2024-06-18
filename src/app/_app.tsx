import { Source_Sans_3 } from "next/font/google";
import "../styles/globals.css";

const sourceSansPro = Source_Sans_3({
  weight: ["400", "700"],
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <div className={sourceSansPro.className}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
