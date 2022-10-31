import styles from "./loader.module.css"
import { animate, AnimationControls, motion } from "framer-motion"
import { defaultTransition } from "../utils/transition";

const variants = {
    initial: {
        y: 50,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1
    }
}

export default function Loader({title, loaderControls}){
    return (
        <motion.div className={styles.fullLoader} animate={loaderControls}>
          <motion.h1
          variants={variants}
          initial={"initial"}
          animate={"animate"}
          transition={defaultTransition}
          >{title}</motion.h1>
        </motion.div>
    )
}