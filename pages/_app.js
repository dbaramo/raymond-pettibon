import Head from "next/head";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import "../styles/globals.css";
import data from "../data/data.json";

let prevRoute = null;
let currentRoute = null;

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const route = router.route;

  pageProps.prevRoute = prevRoute
  pageProps.currentRoute = currentRoute
  
  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      prevRoute = currentRoute;
      currentRoute = url;
      pageProps.prevRoute = prevRoute
      pageProps.currentRoute = currentRoute
    };
    router.events.on("routeChangeStart", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Raymond Pettibon</title>
        <link rel="icon" href="./globe.ico"></link>
        {data.map((url) => <link rel="preload" as="image" href={url} key={url} />)}
      </Head>

      <AnimatePresence exitBeforeEnter={true}>
        <motion.div
          initial="initialState"
          animate="animateState"
          exit="exitState"
          key={route}
          transition={{
            duration: 1,
          }}
          variants={{
            initialState: {
              clipPath: "inset(0 0 0 0)"
            },
            animateState: {
              clipPath: "inset(0 0 0 0)"
            },
            exitState: {
              clipPath: "inset(0 50% 0 50%)"
            },
          }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default MyApp;
