import 'tailwindcss/tailwind.css'
import '../styles/global.css'
import Router from "next/router";
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("findished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
      {loading ? (
        <>
          <div class=" flex justify-center items-center h-full h-screen overflow-auto">
            <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-azul"></div>
          </div>
        </>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default MyApp
