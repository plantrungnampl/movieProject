import { Source_Sans_3 } from "next/font/google";
import "../styles/globals.css";
import { AppProps } from "next/app";
import TransitionNextPage from "./components/TransitionNextPage";
const sourceSansPro = Source_Sans_3({
  weight: ["400", "700"],
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TransitionNextPage>
      <div className={sourceSansPro.className}>
        <Component {...pageProps} />
      </div>
    </TransitionNextPage>
  );
}

export default MyApp;
