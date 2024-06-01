import styles from './Playground.module.css'

interface Props {
  children?: React.ReactNode
}

const Playground = ({children}: Props): JSX.Element => {
  return (<div className={styles.playground}>{children}</div>)
}

export {
  Playground
}
