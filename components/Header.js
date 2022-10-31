import { Columns, Grid } from "react-feather"
import styles from "./header.module.css"


export default function Header({ view, toggleView }){
    return (
        <header className={styles.headerContainer}>
          <button
            onClick={() => toggleView(!view)}
          >
          {view ? <Columns /> : <Grid />}
          </button>
        </header>
    )
}