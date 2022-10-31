import data from "../data/data.json";
import styles from "./artwork.module.css";
import { motion } from "framer-motion";
import { defaultTransition } from "../utils/transition";

export default function Artworks({ url, index }) {
  return (
    <motion.img
      layoutId={`container-${index}`}
      transition={defaultTransition}
      className={styles.gridItemMedia}
      src={url}
      key={url}
    />
  );
}
