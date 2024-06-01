import styles from './Header.module.css'

interface Props {
  children?: React.ReactNode
}

const Header = ({children}: Props): JSX.Element => {
  return (<header className={styles.header}>{children}</header>)
}

export {
  Header
}
