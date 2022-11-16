import Head from "next/head";
import Link from "next/link";
import { Instagram } from "react-feather";
import styles from "../styles/Info.module.css";
import { motion } from "framer-motion";

export default function Info(props) {
  return (
    <>
    <div className={styles.backButtonDiv}>
      <Link href="/">
        <button className={styles.backButton}>Back</button>
      </Link>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.leftSide}>
          <img src="./raymond-info.webp" />
        </div>
        <div className={styles.rightSide}>
          <p>
            Raymond Pettibon is an American artist who lives and works in New
            York City. Pettibon came to prominence in the early 1980s in the
            southern California punk rock scene, creating posters and album art
            mainly for groups on SST Records, owned and operated by his older
            brother, Greg Ginn. He has subsequently become widely recognized in
            the fine art world for using American iconography variously pulled
            from literature, art history, philosophy, and religion to politics,
            sport, and sexuality. As Holland Cotter noted in The New York Times:
            Mr. Pettibon is, with gratifying regularity, a sharp political
            critic. It is the most interesting thing about him. His targets can
            be quite specific: the drug-wrecked hippie movement of the 1960s,
            the American war in Iraq. Yet his entire output, despite interludes
            of lyricism and nostalgia, and a running strain of stand-up humor,
            is a steady indictment of American culture as he has lived it over
            the past 60 years.
          </p>
          <Link href="https://www.instagram.com/raymond_pettibon_/">
            <Instagram className={styles.instagram} />
          </Link>
        </div>
      </div>
    </>
  );
}
