import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import data from "../data/data.json";
import Header from "../components/Header";
import Artworks from "../components/Artworks";
import Loader from "../components/Loader";
import defaultTransition from "../utils/transition";

const gridUtils = [600, 400, 600, 800, 600];

export default function Home() {
  const [gridVisible, setGridVisible] = useState(true);
  const loaderControls = useAnimation();
  const animation = useAnimation();
  const bgColor = useMotionValue("black");

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

      bgColor.set("white")

      await animation.start(() => ({
        scale: 1,
        transition: { delay: 0.2 },
      }));

      setGridVisible(false);
    }
    setTimeout(() => {
      loaderControls.start({
        opacity: 0,
        transition: { defaultTransition },
      });

      sequence();
    }, 2000);
  }, []);

  return (
    <>
      <Loader title="Raymond Pettibon" loaderControls={loaderControls} />
      <Header view={gridVisible} toggleView={(view) => setGridVisible(view)} />
      <motion.div 
      className={styles.content}
      
      style={{
        backgroundColor: bgColor,
        transition: "background-color 0.5s ease-in-out"
      }}
      >
        {gridVisible && (
          <div className={styles.gridContainer} onMouseMove={(e) => console.log(e)}>
            <div className={styles.gridElements}>
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
            </div>
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
