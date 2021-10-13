import 'tailwindcss/tailwind.css'
import Router from "next/router";
import { useState, useEffect } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

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
    <h1 className="flex justify-center items-center text-indigo-900 mt-6 h-full lg:h-screen overflow-auto">Carregando...</h1>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default MyApp
