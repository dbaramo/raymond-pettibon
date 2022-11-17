import Link from "next/link";
import { Columns, Grid } from "react-feather";
import styles from "./header.module.css";
import { useEffect, useState } from "react";

export default function Header({ view, toggleView }) {
  const [displayToggleButton, setDisplayToggleButton] = useState(false);
  useEffect(() => {
    if ("ontouchstart" in document.documentElement) {
      setDisplayToggleButton(true);
    }
  }, []);
  return (
    <header className={styles.headerContainer}>
      <Link href="/info">
        <button className={styles.infoButton}>info</button>
      </Link>
      {displayToggleButton ? null : (
        <button onClick={() => toggleView(!view)}>
          {view ? <Columns /> : <Grid />}
        </button>
      )}
    </header>
  );
}
