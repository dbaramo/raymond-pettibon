import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useSpring,
} from "framer-motion";
import data from "../data/data.json";
import Header from "../components/Header";
import Artworks from "../components/Artworks";
import Loader from "../components/Loader";
import defaultTransition from "../utils/transition";

const gridUtils = [600, 400, 600, 800, 600];

export default function Home({ prevRoute, currentRoute}) {
  const [gridVisible, setGridVisible] = useState(true);
  const [changeCount, setChangeCount] = useState(0);
  const gridRef = useRef(null);
  const loaderControls = useAnimation();
  const animation = useAnimation();
  const bgColor = useMotionValue("black");
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    if(prevRoute !== null){
      if ("ontouchstart" in document.documentElement){
        setGridVisible(false)
      }
    }
  }, [])
  
  useEffect(() => {
    async function sequence() {
      await animation.set((index) => ({
        y: gridUtils[index % 5],
        scale: 1.1,
      }));

      await animation.start(() => ({
        y: 0,
        transition: { duration: 1 },
      }));

      bgColor.set("white");

      await animation.start(() => ({
        scale: 1,
        transition: { delay: 0.2 },
      }));

      setGridVisible(false);
    }

    function chooseAnimation(){
      if(prevRoute === null){
        setTimeout(() => {
          loaderControls.start({
            opacity: 0,
            transition: { defaultTransition },
          });
          sequence();
        }, 2000);
      }
    }

    chooseAnimation()
  }, []);

  const handleGridParallax = (event, entered) => {
    if ("ontouchstart" in document.documentElement) return
    if (gridRef.current) {
      let { width, height } = gridRef.current.getBoundingClientRect();
      let displayWidth = window.innerWidth;
      let displayHeight = window.innerHeight;
      let amp = width / displayWidth;
      let newX = -event.pageX * amp;
      let newY = -event.pageY;
      let maxDistanceX = width - displayWidth;
      let maxDistanceY = height - displayHeight;

      if (Math.abs(newX) < Math.abs(maxDistanceX)) x.set(newX);
      if (Math.abs(newY) < Math.abs(maxDistanceY)) y.set(newY);
    }

  };

useEffect(() => {
  if(gridRef.current && (changeCount > 0 || prevRoute !== null)){
    let { width, height } = gridRef.current.getBoundingClientRect();
    let displayWidth = window.innerWidth;
    let maxDistanceX = width - displayWidth;
    x.set(-maxDistanceX)
  }

}, [gridVisible, changeCount])

  const xMotion = useSpring(x, { stiffness: 400, damping: 90 });
  const yMotion = useSpring(y, { stiffness: 400, damping: 90 });

  return (
    <>
    {prevRoute === null ? <Loader title="Raymond Pettibon" loaderControls={loaderControls} /> : null}
      <Header view={gridVisible} toggleView={(view) => {
        setGridVisible(view)
        setChangeCount(changeCount + 1)
      }} />
      <motion.div
        className={prevRoute === null ? styles.content : `${styles.content} ${styles.contentIntro}`}
        style={{
          backgroundColor: prevRoute === null ? bgColor : "white",
          transition: "background-color 0.5s ease-in-out",
        }}
      >
        {gridVisible && (
          <div className={styles.gridContainer}>
            <motion.div
              onMouseMove={handleGridParallax}
              ref={gridRef}
              className={styles.gridElements}
              transition={defaultTransition}
              style={{
                x: xMotion,
                y: yMotion,
              }}
            >
              {data.map((url, index) => (
                <motion.div
                  custom={index}
                  animate={animation}
                  key={index}
                  className={styles.element}
                >
                  <div className={styles.thumbnailWrapper}>
                    <Artworks url={url} index={index} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
        {!gridVisible && (
          <div className={styles.listElements}>
            {data.map((url, index) => (
              <div key={index} className={styles.element}>
                <Artworks url={url} index={index} />
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </>
  );
}
