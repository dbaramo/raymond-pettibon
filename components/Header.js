import Link from "next/link"
import { Columns, Grid } from "react-feather"
import styles from "./header.module.css"


export default function Header({ view, toggleView }){
    return (
        <header className={styles.headerContainer}>
        <Link href="/info">
          <button  className={styles.infoButton}>info</button>
        </Link>
          <button
            onClick={() => toggleView(!view)}
          >
          {view ? <Columns /> : <Grid />}
          </button>
        </header>
    )
}