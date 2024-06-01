import styles from './Main.module.css'

interface Props {
  children?: React.ReactNode
}

const Main = ({children}: Props): JSX.Element => {
  return (<main className={styles.main}>{children}</main>)
}

export {
  Main
}
