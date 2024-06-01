import styles from './Aside.module.css'
interface Props {
  children?: React.ReactNode
}

const Aside = ({children}: Props): JSX.Element => {
  return (<aside className={styles.aside}>{children}</aside>)
}

export {
  Aside
}
